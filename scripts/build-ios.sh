#!/bin/bash

# Build iOS app for App Store submission
# This script builds your iOS app using EAS

set -e

echo "🍎 Building iOS app for production..."
echo "📦 This will create a build for App Store submission"
echo ""

# Auto-increment iOS build number
echo "🔢 Incrementing iOS build number..."
node scripts/increment-ios-build-number.js
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
echo "⏱️  This typically takes 15-20 minutes"
echo ""

eas build --platform ios --profile production

echo ""
echo "✅ Build complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Wait for build to complete at: https://expo.dev"
echo "  2. Once done, run: ./scripts/submit-ios.sh"
echo ""
