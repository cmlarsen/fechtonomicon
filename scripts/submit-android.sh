#!/bin/bash

# Submit Android app to Google Play Store
# This script submits your built Android app to Google

set -e

echo "🤖 Submitting Android app to Google Play Store..."
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

# Check if service account key exists
if [ ! -f "./google-service-account.json" ]; then
    echo "⚠️  Google service account key not found!"
    echo ""
    echo "To submit to Google Play, you need a service account key:"
    echo "  1. Go to: https://play.google.com/console"
    echo "  2. Setup → API access → Create service account"
    echo "  3. Download the JSON key"
    echo "  4. Save as: google-service-account.json"
    echo ""
    echo "Alternatively, submit manually:"
    echo "  eas submit --platform android --latest"
    echo ""
    exit 1
fi

echo "📤 Submitting latest Android build to Google Play..."
echo ""

eas submit --platform android --latest

echo ""
echo "✅ Submission complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Go to https://play.google.com/console"
echo "  2. Select your app"
echo "  3. Complete app information and content rating"
echo "  4. Create a release (Internal/Alpha/Beta/Production)"
echo ""
