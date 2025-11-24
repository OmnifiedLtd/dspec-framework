#!/bin/bash
set -e

echo "Running Docusaurus build test..."
cd website
npm run clear
npm run build
echo "Build successful!"
