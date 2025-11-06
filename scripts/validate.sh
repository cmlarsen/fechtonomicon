#!/usr/bin/env bash
set -e

echo "🔍 Running code quality checks..."

echo "📝 Checking formatting..."
yarn format:check || {
  echo "❌ Formatting check failed. Run 'yarn format' to fix."
  exit 1
}

echo "🔎 Running linter..."
yarn lint || {
  echo "❌ Linting failed. Run 'yarn lint:fix' to auto-fix issues."
  exit 1
}

echo "📘 Running TypeScript type check..."
yarn typecheck || {
  echo "❌ TypeScript check failed. Fix type errors before committing."
  exit 1
}

echo "✅ All checks passed!"
