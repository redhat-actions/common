#!/usr/bin/env bash
set -e 
set -o pipefail

# Define a timestamp function
timestamp() {
  date +"%s"
}
echo "npm version:"
npm version

npm ci

file_name="action-generated-ins-outs-$(timestamp).ts"
echo "Generating inputs and outputs enum in $file_name"

set -x

npx action-io-generator --outFile=$file_name

set +x

if git --no-pager diff --no-index --exit-code $INPUT_IO_FILE $file_name; then
    echo "✅ Inputs and Outputs are configured correctly!"
else
    echo "❌ Inputs and Outputs are not configured correctly!"
    exit 1
fi
