#!/bin/bash
echo "Starting training for Mangrove and Seagrass Classification..."

PROJECT_DIR=$(pwd)
TF_DIR="$PROJECT_DIR/tf_files"

mkdir -p $TF_DIR/bottlenecks
mkdir -p $TF_DIR/training_summaries/basic
mkdir -p inception

# Download Inception model if not exists
if [ ! -f "inception/classify_image_graph_def.pb" ]; then
    echo "Downloading Inception model..."
    curl -O http://download.tensorflow.org/models/image/imagenet/inception-2015-12-05.tgz
    tar -xzf inception-2015-12-05.tgz -C inception/
    rm inception-2015-12-05.tgz
fi

python3 retrain.py \
  --bottleneck_dir=$TF_DIR/bottlenecks \
  --how_many_training_steps=20 \
  --model_dir=inception \
  --summaries_dir=$TF_DIR/training_summaries/basic \
  --output_graph=$TF_DIR/retrained_graph.pb \
  --output_labels=$TF_DIR/retrained_labels.txt \
  --image_dir=datasets


echo "Training completed!"
echo "Model saved to: $TF_DIR/retrained_graph.pb"
echo "Labels saved to: $TF_DIR/retrained_labels.txt"
