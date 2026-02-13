#!/bin/bash
# Release build script

set -e

if [ -z "$1" ]; then
  echo "Usage: ./scripts/release/build.sh <version>"
  echo "Example: ./scripts/release/build.sh 1.0.0"
  exit 1
fi

VERSION=$1

echo "Building Kanshi OS v$VERSION..."

# Run tests
pnpm test

# Build all packages
pnpm build

# Create artifacts
mkdir -p build/v$VERSION
cp -r dist/ build/v$VERSION/

echo "Build complete: build/v$VERSION"
echo "Next steps:"
echo "  1. Review changes"
echo "  2. Create git tag: git tag -a v$VERSION"
echo "  3. Push to repository: git push --tags"
