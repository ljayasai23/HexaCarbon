import os
import sys
import tensorflow as tf
import numpy as np
from absl import app, flags

# Disable eager execution for TF2 compatibility
tf.compat.v1.disable_eager_execution()

FLAGS = flags.FLAGS

# Arguments expected by train.sh
flags.DEFINE_string('image_dir', None, 'Path to folders of labeled images.')
flags.DEFINE_string('bottleneck_dir', '/tmp/bottleneck', 'Path to cache bottleneck layer values.')
flags.DEFINE_string('model_dir', '/tmp/imagenet', 'Path to pre-trained model directory.')
flags.DEFINE_string('summaries_dir', '/tmp/retrain_logs', 'Where to save summary logs for TensorBoard.')
flags.DEFINE_string('output_graph', '/tmp/output_graph.pb', 'Where to save the trained graph.')
flags.DEFINE_string('output_labels', '/tmp/output_labels.txt', 'Where to save the trained graph\'s labels.')
flags.DEFINE_integer('how_many_training_steps', 4000, 'How many training steps to run.')
flags.DEFINE_integer('train_batch_size', 32, 'How many images to train on at a time.')
flags.DEFINE_integer('validation_batch_size', 100, 'How many images to use in an evaluation batch.')
flags.DEFINE_float('learning_rate', 0.01, 'Learning rate.')
flags.DEFINE_boolean('flip_left_right', False, 'Whether to randomly flip half of the training images horizontally.')
flags.DEFINE_integer('random_crop', 0, 'Percentage of image to randomly crop.')
flags.DEFINE_integer('random_scale', 0, 'Percentage to randomly scale image.')
flags.DEFINE_integer('random_brightness', 0, 'Percentage to randomly adjust image brightness.')


def build_model(num_classes):
    base_model = tf.keras.applications.MobileNetV2(
        weights='imagenet', include_top=False, input_shape=(224, 224, 3))

    x = base_model.output
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    predictions = tf.keras.layers.Dense(num_classes, activation='softmax', name='final_result')(x)

    model = tf.keras.models.Model(inputs=base_model.input, outputs=predictions)
    return model


def main(argv):
    if not FLAGS.image_dir:
        print('You must supply the image_dir')
        sys.exit(1)

    # Load dataset
    datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        rescale=1.0/255,
        validation_split=0.2,
        horizontal_flip=FLAGS.flip_left_right,
    )

    train_generator = datagen.flow_from_directory(
        FLAGS.image_dir,
        target_size=(224, 224),
        batch_size=FLAGS.train_batch_size,
        class_mode='categorical',
        subset='training')

    val_generator = datagen.flow_from_directory(
        FLAGS.image_dir,
        target_size=(224, 224),
        batch_size=FLAGS.validation_batch_size,
        class_mode='categorical',
        subset='validation')

    num_classes = len(train_generator.class_indices)

    # Build model
    model = build_model(num_classes)
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=FLAGS.learning_rate),
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])

    # Train
        # Calculate safe steps and epochs
    steps_per_epoch = max(1, train_generator.samples // FLAGS.train_batch_size)
    validation_steps = max(1, val_generator.samples // FLAGS.validation_batch_size)
    epochs = max(1, FLAGS.how_many_training_steps // steps_per_epoch)

    print("Train samples:", train_generator.samples)
    print("Validation samples:", val_generator.samples)
    print("Steps per epoch:", steps_per_epoch)
    print("Validation steps:", validation_steps)
    print("Epochs:", epochs)

    # Train
    model.fit(
        train_generator,
        steps_per_epoch=steps_per_epoch,
        epochs=epochs,
        validation_data=val_generator,
        validation_steps=validation_steps
    )


    # Save labels
    labels = list(train_generator.class_indices.keys())
    with open(FLAGS.output_labels, 'w') as f:
        for label in labels:
            f.write(label + '\n')

    # Convert to frozen graph with final_result
    full_model = tf.function(lambda x: model(x))
    concrete_func = full_model.get_concrete_function(tf.TensorSpec([None, 224, 224, 3], tf.float32))

          # Get the actual output tensor name from Keras
    output_node_name = model.output.op.name
    print("Model output node name:", output_node_name)

      # Freeze the model
    frozen_func = tf.compat.v1.graph_util.convert_variables_to_constants(
          sess=tf.compat.v1.keras.backend.get_session(),
          input_graph_def=tf.compat.v1.get_default_graph().as_graph_def(),
          output_node_names=[output_node_name])

    with tf.io.gfile.GFile(FLAGS.output_graph, 'wb') as f:
          f.write(frozen_func.SerializeToString())



    with tf.io.gfile.GFile(FLAGS.output_graph, 'wb') as f:
        f.write(frozen_func.SerializeToString())

    print("Training completed!")
    print("Model saved to:", FLAGS.output_graph)
    print("Labels saved to:", FLAGS.output_labels)


if __name__ == '__main__':
    app.run(main)
    None