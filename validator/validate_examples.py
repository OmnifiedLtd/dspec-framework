# /// script
# dependencies = [
#   "jsonschema",
#   "PyYAML",
# ]
# ///

import os
import sys
import json
import yaml
import jsonschema
from pathlib import Path

def validate_yaml_files():
    # Determine paths relative to this script
    script_dir = Path(__file__).parent.resolve()
    project_root = script_dir.parent
    examples_dir = project_root / "examples"
    schemas_dir = project_root / "schemas"

    # Map filenames to their schema filenames
    schema_mapping = {
        "domain-model.yaml": "domain-model.schema.json",
        "level0.yaml": "level0.schema.json",
        "level1.yaml": "level1.schema.json",
        "level2.yaml": "level2.schema.json",
    }

    # Pre-load schemas to avoid reloading them constantly
    loaded_schemas = {}
    for yaml_name, schema_name in schema_mapping.items():
        schema_path = schemas_dir / schema_name
        if schema_path.exists():
            try:
                with open(schema_path, 'r') as f:
                    loaded_schemas[yaml_name] = json.load(f)
            except Exception as e:
                print(f"❌ Error loading schema {schema_name}: {e}")
        else:
            print(f"⚠️  Warning: Schema {schema_name} not found at {schema_path}")

    validation_passed = True
    files_checked = 0

    print(f"🔍 Scanning {examples_dir} for YAML files...")

    for root, _, files in os.walk(examples_dir):
        for file in files:
            if file in schema_mapping:
                file_path = Path(root) / file
                schema = loaded_schemas.get(file)
                
                if not schema:
                    print(f"⚠️  Skipping {file_path}: Schema not loaded.")
                    continue

                files_checked += 1
                try:
                    with open(file_path, 'r') as f:
                        # Load all documents if there are multiple, but usually dspec is single doc
                        data = yaml.safe_load(f)
                    
                    jsonschema.validate(instance=data, schema=schema)
                    print(f"✅ Validated: {file_path.relative_to(project_root)}")
                except yaml.YAMLError as e:
                    print(f"❌ YAML Syntax Error in {file_path.relative_to(project_root)}:\n{e}")
                    validation_passed = False
                except jsonschema.ValidationError as e:
                    print(f"❌ Schema Validation Error in {file_path.relative_to(project_root)}:\n{e.message}")
                    validation_passed = False
                except Exception as e:
                    print(f"❌ Unexpected Error in {file_path.relative_to(project_root)}:\n{e}")
                    validation_passed = False

    print("-" * 40)
    if files_checked == 0:
        print("⚠️  No matching YAML files found to validate.")
    elif validation_passed:
        print(f"🎉 All {files_checked} files validated successfully!")
        sys.exit(0)
    else:
        print(f"💥 Validation failed for one or more files.")
        sys.exit(1)

if __name__ == "__main__":
    if not os.path.exists("examples"):
        # Fallback if running from wrong dir, though path resolution above handles script location
        pass 
    
    validate_yaml_files()
