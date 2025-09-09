import tensorflow as tf
import sys
import os
import numpy as np
from glob import glob

def load_graph(model_file):
    graph = tf.Graph()
    graph_def = tf.GraphDef()

    with open(model_file, "rb") as f:
        graph_def.ParseFromString(f.read())
    with graph.as_default():
        tf.import_graph_def(graph_def)

    return graph

def read_tensor_from_image_file(ffile_name, input_height=224, input_width=224,
                                input_mean=0, input_std=255):
    input_name = "file_reader"
    output_name = "normalized"
    file_reader = tf.read_file(file_name, input_name)
    if file_name.endswith(".png"):
        image_reader = tf.image.decode_png(file_reader, channels=3,
                                          name='png_reader')
    elif file_name.endswith(".gif"):
        image_reader = tf.squeeze(tf.image.decode_gif(file_reader,
                                                     name='gif_reader'))
    elif file_name.endswith(".bmp"):
        image_reader = tf.image.decode_bmp(file_reader, name='bmp_reader')
    else:
        image_reader = tf.image.decode_jpeg(file_reader, channels=3,
                                           name='jpeg_reader')
    float_caster = tf.cast(image_reader, tf.float32)
    dims_expander = tf.expand_dims(float_caster, 0)
    resized = tf.image.resize_bilinear(dims_expander, [input_height, input_width])
    normalized = tf.divide(tf.subtract(resized, [input_mean]), [input_std])
    sess = tf.Session()
    result = sess.run(normalized)

    return result

def load_labels(label_file):
    label = []
    proto_as_ascii_lines = tf.gfile.GFile(label_file).readlines()
    for l in proto_as_ascii_lines:
        label.append(l.rstrip())
    return label

def classify_batch(image_folder):
    model_file = "tf_files/retrained_graph.pb"
    label_file = "tf_files/retrained_labels.txt"
    input_layer = "input_1"
    output_layer = "final_result/Softmax"

    # Get all image files
    image_extensions = ['*.jpg', '*.jpeg', '*.png', '*.bmp', '*.gif']
    image_files = []
    for ext in image_extensions:
        image_files.extend(glob(os.path.join(image_folder, ext)))
        image_files.extend(glob(os.path.join(image_folder, ext.upper())))

    if not image_files:
        print(f"No image files found in {image_folder}")
        return

    graph = load_graph(model_file)
    labels = load_labels(label_file)
    
    # Find indices for each class
    mangrove_idx = None
    non_mangrove_idx = None
    seagrass_idx = None
    non_seagrass_idx = None
    
    for i, label in enumerate(labels):
        if 'mangroves_mangroves' in label:
            mangrove_idx = i
        elif 'mangroves_non_mangroves' in label:
            non_mangrove_idx = i
        elif 'seagrass_seagrass' in label:
            seagrass_idx = i
        elif 'seagrass_non_seagrass' in label:
            non_seagrass_idx = i

    print(f"\n🔍 Batch Classification Results")
    print(f"📁 Folder: {image_folder}")
    print(f"📸 Found {len(image_files)} images")
    print("=" * 80)

    mangrove_count = 0
    seagrass_count = 0

    for image_path in image_files:
        try:
            t = read_tensor_from_image_file(image_path,
                                          input_height=299,
                                          input_width=299,
                                          input_mean=0,
                                          input_std=255)

            input_name = "import/" + input_layer
            output_name = "import/" + output_layer
            input_operation = graph.get_operation_by_name(input_name)
            output_operation = graph.get_operation_by_name(output_name)

            with tf.Session(graph=graph) as sess:
                results = sess.run(output_operation.outputs[0],
                                  {input_operation.outputs[0]: t})
            results = np.squeeze(results)

            # Calculate binary decisions
            mangrove_result = "Unknown"
            seagrass_result = "Unknown"
            
            if mangrove_idx is not None and non_mangrove_idx is not None:
                mangrove_confidence = results[mangrove_idx] / (results[mangrove_idx] + results[non_mangrove_idx])
                is_mangrove = mangrove_confidence > 0.5
                mangrove_result = f"{'✅ YES' if is_mangrove else '❌ NO'} ({mangrove_confidence*100:.1f}%)"
                if is_mangrove:
                    mangrove_count += 1
            
            if seagrass_idx is not None and non_seagrass_idx is not None:
                seagrass_confidence = results[seagrass_idx] / (results[seagrass_idx] + results[non_seagrass_idx])
                is_seagrass = seagrass_confidence > 0.5
                seagrass_result = f"{'✅ YES' if is_seagrass else '❌ NO'} ({seagrass_confidence*100:.1f}%)"
                if is_seagrass:
                    seagrass_count += 1

            print(f"📷 {os.path.basename(image_path):<25} | 🌿 Mangrove: {mangrove_result:<15} | 🌊 Seagrass: {seagrass_result}")

        except Exception as e:
            print(f"❌ Error processing {os.path.basename(image_path)}: {str(e)}")

    print("=" * 80)
    print(f"📊 SUMMARY:")
    print(f"   🌿 Mangroves detected: {mangrove_count}/{len(image_files)} images")
    print(f"   🌊 Seagrass detected: {seagrass_count}/{len(image_files)} images")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 batch_classify.py <image_folder>")
        print("Example: python3 batch_classify.py test_images/")
        sys.exit(1)
    
    image_folder = sys.argv[1]
    if not os.path.exists(image_folder):
        print(f"Error: Folder '{image_folder}' does not exist.")
        sys.exit(1)
    
    classify_batch(image_folder)
