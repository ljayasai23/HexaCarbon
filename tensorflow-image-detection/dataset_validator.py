import os
import sys

def validate_dataset_structure(datasets_dir):
    """
    Validates that the dataset structure matches the expected format.
    
    Args:
        datasets_dir: Path to the datasets directory
    
    Returns:
        bool: True if structure is valid, False otherwise
    """
    if not os.path.exists(datasets_dir):
        print(f"❌ Datasets directory '{datasets_dir}' not found!")
        return False
    
    print(f"🔍 Validating dataset structure in '{datasets_dir}'...")
    
    # Expected structure
    expected_datasets = ['mangroves', 'seagrass']
    expected_splits = ['train', 'test', 'validation']
    
    valid = True
    total_images = 0
    
    for dataset_name in expected_datasets:
        dataset_path = os.path.join(datasets_dir, dataset_name)
        
        if not os.path.exists(dataset_path):
            print(f"⚠️  Dataset '{dataset_name}' not found")
            continue
            
        print(f"\n📁 Checking {dataset_name} dataset:")
        
        for split in expected_splits:
            split_path = os.path.join(dataset_path, split)
            
            if not os.path.exists(split_path):
                print(f"  ❌ Missing '{split}' folder")
                valid = False
                continue
            
            # Check for class folders
            class_dirs = [d for d in os.listdir(split_path) 
                         if os.path.isdir(os.path.join(split_path, d))]
            
            if not class_dirs:
                print(f"  ❌ No class folders found in '{split}'")
                valid = False
                continue
            
            print(f"  ✅ {split}/ - Found classes: {class_dirs}")
            
            # Count images in each class
            for class_name in class_dirs:
                class_path = os.path.join(split_path, class_name)
                
                # Count image files
                image_extensions = ['.jpg', '.jpeg', '.png', '.bmp', '.gif']
                image_count = 0
                
                for file in os.listdir(class_path):
                    if any(file.lower().endswith(ext) for ext in image_extensions):
                        image_count += 1
                
                total_images += image_count
                print(f"    📸 {class_name}: {image_count} images")
                
                if image_count < 10:
                    print(f"    ⚠️  Warning: Only {image_count} images (recommend 100+)")
    
    print(f"\n📊 Total images found: {total_images}")
    
    if valid:
        print("✅ Dataset structure is valid!")
    else:
        print("❌ Dataset structure has issues. Please fix before training.")
    
    return valid

def create_sample_structure(datasets_dir):
    """Creates a sample dataset structure for reference."""
    print(f"📁 Creating sample dataset structure in '{datasets_dir}'...")
    
    structure = {
        'mangroves': {
            'train': ['mangroves', 'non_mangroves'],
            'test': ['mangroves', 'non_mangroves'],
            'validation': ['mangroves', 'non_mangroves']
        },
        'seagrass': {
            'train': ['seagrass', 'non_seagrass'],
            'test': ['seagrass', 'non_seagrass'],
            'validation': ['seagrass', 'non_seagrass']
        }
    }
    
    for dataset_name, splits in structure.items():
        for split_name, classes in splits.items():
            for class_name in classes:
                path = os.path.join(datasets_dir, dataset_name, split_name, class_name)
                os.makedirs(path, exist_ok=True)
                
                # Create a README file in each class folder
                readme_path = os.path.join(path, 'README.txt')
                with open(readme_path, 'w') as f:
                    f.write(f"Place {class_name} images here for {split_name} set\n")
                    f.write("Supported formats: .jpg, .jpeg, .png, .bmp, .gif\n")
    
    print("✅ Sample structure created! Add your images to the appropriate folders.")

if __name__ == "__main__":
    datasets_dir = "datasets"
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "--create-structure":
            create_sample_structure(datasets_dir)
        else:
            datasets_dir = sys.argv[1]
    
    validate_dataset_structure(datasets_dir)
