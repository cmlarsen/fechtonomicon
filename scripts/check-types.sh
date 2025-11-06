#!/usr/bin/env bash
set -e

echo "🔍 Running TypeScript type checking..."
echo ""

# Run TypeScript compiler and capture output
if yarn typecheck 2>&1; then
  echo ""
  echo "✅ Type checking passed! No type errors found."
  exit 0
else
  EXIT_CODE=$?
  echo ""
  echo "❌ Type checking failed with errors above."
  echo ""
  echo "📊 Summary:"
  echo "  Run 'yarn typecheck' to see all errors"
  echo "  Run 'yarn typecheck:watch' for watch mode"
  echo "  Run 'yarn typecheck:verbose' for formatted output"
  echo ""
  exit $EXIT_CODE
fi
