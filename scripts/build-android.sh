#!/bin/bash

# Build Android app for Play Store submission
# This script builds your Android app using EAS

set -e

echo "🤖 Building Android app for production..."
echo "📦 This will create an AAB (App Bundle) for Play Store submission"
echo ""

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

# Check if logged in
if ! eas whoami &> /dev/null; then
    echo "🔐 Please login to EAS..."
    eas login
fi

echo ""
echo "🚀 Starting production build..."
echo "⏱️  This typically takes 10-15 minutes"
echo ""

eas build --platform android --profile production

echo ""
echo "✅ Build complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Wait for build to complete at: https://expo.dev"
echo "  2. Once done, run: ./scripts/submit-android.sh"
echo ""
