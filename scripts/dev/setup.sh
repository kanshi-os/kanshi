#!/bin/bash
# Development setup scripts

set -e

echo "Setting up Kanshi development environment..."

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run migrations (if any)
# pnpm --filter api db:migrate

echo "Development environment ready!"
echo ""
echo "Start development servers with:"
echo "  pnpm dev"
echo ""
echo "API: http://localhost:3000"
echo "Web: http://localhost:3001"
