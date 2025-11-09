#!/bin/bash

# Submit iOS app to App Store Connect
# This script submits your built iOS app to Apple

set -e

echo "🍎 Submitting iOS app to App Store Connect..."
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

echo "📤 Submitting latest iOS build to App Store Connect..."
echo ""
echo "You'll be prompted for:"
echo "  - Your Apple ID"
echo "  - App-specific password (create at appleid.apple.com)"
echo ""

eas submit --platform ios --latest

echo ""
echo "✅ Submission complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Go to https://appstoreconnect.apple.com"
echo "  2. Select your app under 'My Apps'"
echo "  3. Wait for build to process (10-30 minutes)"
echo "  4. Add screenshots and complete app information"
echo "  5. Click 'Submit for Review'"
echo ""
