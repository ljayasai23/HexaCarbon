import tensorflow as tf
import sys
import os
import numpy as np
from tkinter import filedialog
import tkinter as tk

def load_graph(model_file):
  graph = tf.Graph()
  graph_def = tf.GraphDef()

  with open(model_file, "rb") as f:
    graph_def.ParseFromString(f.read())
  with graph.as_default():
    tf.import_graph_def(graph_def)

  return graph

def read_tensor_from_image_file(file_name, input_height=224, input_width=224,
                                input_mean=0, input_std=255):
  input_name = "file_reader"
  output_name = "normalized"
  file_reader = tf.read_file(file_name, input_name)
  if file_name.endswith(".png"):
    image_reader = tf.image.decode_png(file_reader, channels = 3,
                                       name='png_reader')
  elif file_name.endswith(".gif"):
    image_reader = tf.squeeze(tf.image.decode_gif(file_reader,
                                                  name='gif_reader'))
  elif file_name.endswith(".bmp"):
    image_reader = tf.image.decode_bmp(file_reader, name='bmp_reader')
  else:
    image_reader = tf.image.decode_jpeg(file_reader, channels = 3,
                                        name='jpeg_reader')
  float_caster = tf.cast(image_reader, tf.float32)
  dims_expander = tf.expand_dims(float_caster, 0);
  resized = tf.image.resize_bilinear(dims_expander, [input_height, input_width])
  normalized = tf.subtract(tf.divide(resized, 127.5), 1.0)
  sess = tf.Session()
  result = sess.run(normalized)

  return result

def load_labels(label_file):
  label = []
  proto_as_ascii_lines = tf.gfile.GFile(label_file).readlines()
  for l in proto_as_ascii_lines:
    label.append(l.rstrip())
  return label

def classify_image(image_path):
    model_file = "/home/manasa/tensorflow-image-detection/tf_files/retrained_graph.pb"
    label_file = "/home/manasa/tensorflow-image-detection/tf_files/retrained_labels.txt"

    input_layer = "input_1"
    output_layer = "final_result/Softmax"

    graph = load_graph(model_file)
    

    t = read_tensor_from_image_file(
    image_path,
    input_height=224,
    input_width=224,
    input_mean=0,
    input_std=255
    )


    input_name = "import/" + input_layer
    output_name = "import/" + output_layer
    input_operation = graph.get_operation_by_name(input_name);
    output_operation = graph.get_operation_by_name(output_name);

    with tf.Session(graph=graph) as sess:
        results = sess.run(output_operation.outputs[0],
                          {input_operation.outputs[0]: t})
    results = np.squeeze(results)

    labels = load_labels(label_file)
    print("Labels in model:", labels)
    print(f"\n🖼️  Classification Results for: {os.path.basename(image_path)}")
    print("=" * 60)
    
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
    
    # Calculate binary decisions
    if mangrove_idx is not None and non_mangrove_idx is not None:
        mangrove_confidence = results[mangrove_idx] / (results[mangrove_idx] + results[non_mangrove_idx])
        is_mangrove = mangrove_confidence > 0.5
        
        print(f"🌿 MANGROVE DETECTION:")
        print(f"   Answer: {'✅ YES, this is a MANGROVE' if is_mangrove else '❌ NO, this is NOT a mangrove'}")
        print(f"   Confidence: {mangrove_confidence*100:.1f}%")
        print()
    
    if seagrass_idx is not None and non_seagrass_idx is not None:
        seagrass_confidence = results[seagrass_idx] / (results[seagrass_idx] + results[non_seagrass_idx])
        is_seagrass = seagrass_confidence > 0.5
        
        print(f"🌊 SEAGRASS DETECTION:")
        print(f"   Answer: {'✅ YES, this is SEAGRASS' if is_seagrass else '❌ NO, this is NOT seagrass'}")
        print(f"   Confidence: {seagrass_confidence*100:.1f}%")
        print()
    
    # Show detailed probabilities
    print("📊 DETAILED PROBABILITIES:")
    print("-" * 30)
    top_k = results.argsort()[-4:][::-1]
    for i in top_k:
        print(f"   {labels[i].replace('_', ' ').title()}: {results[i]*100:.1f}%")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    # Create a simple file dialog
    root = tk.Tk()
    root.withdraw()  # Hide the main window
    
    file_path = filedialog.askopenfilename(
        title="Select an image to classify",
        filetypes=[("Image files", "*.jpg *.jpeg *.png *.bmp *.gif")]
    )
    
    if file_path:
        classify_image(file_path)
    else:
        print("No file selected.")
