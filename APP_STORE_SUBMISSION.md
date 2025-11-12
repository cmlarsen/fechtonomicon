# 📱 App Store Submission Guide - Fechtonomicon

Your complete step-by-step guide to submitting Fechtonomicon to the Apple App Store.

---

## 🎯 Overview

**Estimated Time:** 1-2 hours of active work + 24-48 hours for review

**What You'll Need:**
- ✅ Apple Developer Account ($99/year)
- ✅ Expo/EAS Account
- ✅ About 50 minutes of focused time
- ✅ Screenshots of your app
- ✅ App description and metadata

---

## Phase 1: Pre-Flight Checks (10 minutes)

### ✅ Step 1.1: Install EAS CLI
```bash
npm install -g eas-cli
```

### ✅ Step 1.2: Login to EAS
```bash
eas login
```
Use your Expo account: `yetanothersidequest`

### ✅ Step 1.3: Verify Configuration
```bash
eas whoami
eas project:info
```

You should see:
- Project ID: `4750fe71-fb15-4fd9-ab2a-9647609aa50a`
- Owner: `yetanothersidequest`

### ✅ Step 1.4: Verify Your Code Quality
```bash
yarn validate
yarn test:ci
```

All checks must pass before building!

---

## Phase 2: Apple Developer Setup (15 minutes)

### ✅ Step 2.1: Verify Your Apple Developer Account
1. Go to [developer.apple.com](https://developer.apple.com)
2. Sign in with your Apple ID
3. Ensure your membership is active
4. Note your Team ID: `YGFSEKK4H2` (already in app.json)

### ✅ Step 2.2: Generate App-Specific Password
1. Go to [appleid.apple.com](https://appleid.apple.com)
2. Sign in with your Apple ID
3. Under **Security** → **App-Specific Passwords**
4. Click **"+"** to generate new password
5. Label it: **"EAS Submit"**
6. **SAVE THIS PASSWORD** - you'll need it for submission!

### ✅ Step 2.3: Create App in App Store Connect
1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Click **"My Apps"** → **"+"** → **"New App"**
3. Fill in:
   - **Platform:** iOS
   - **Name:** Fechtonomicon
   - **Primary Language:** English (U.S.)
   - **Bundle ID:** `com.yetanothersidequest.fechtonomicon`
   - **SKU:** `fechtonomicon-001`
   - **User Access:** Full Access
4. Click **Create**

### ✅ Step 2.4: Set Pricing
1. In your app, go to **Pricing and Availability**
2. Select **Free**
3. Select **All Territories** (or specific countries)
4. Click **Save**

---

## Phase 3: Build Your App (20-30 minutes)

### ✅ Step 3.1: Start Production Build
```bash
./scripts/build-ios.sh
```

Or manually:
```bash
eas build --platform ios --profile production
```

### ✅ Step 3.2: Monitor Build Progress
- Watch the terminal output, OR
- Go to: https://expo.dev/accounts/yetanothersidequest/projects/fechtonomicon/builds
- Build typically takes 15-20 minutes

### ✅ Step 3.3: Wait for Success
You'll see: ✅ Build finished successfully

---

## Phase 4: Prepare App Store Assets (30 minutes)

While waiting for the build, prepare your App Store content:

### ✅ Step 4.1: Capture Screenshots

**Required sizes:**
- iPhone 6.7" (iPhone 15 Pro Max): 1290 x 2796 px
- iPad Pro 12.9" (if supporting iPad): 2048 x 2732 px

**How to capture:**
```bash
# Open simulator
yarn ios

# In Simulator:
# - Navigate to different screens
# - Press Cmd+S to save screenshot
# - Or: Hardware → Screenshot

# Recommended screenshots:
# 1. Beautiful flashcard (hero shot)
# 2. Swipe gesture in action
# 3. Card with full details
# 4. Search/browse screen
# 5. Widget on home screen
```

### ✅ Step 4.2: Prepare Text Content
Open `APP_STORE_CONTENT.md` - it contains:
- ✅ App description (copy-paste ready)
- ✅ Keywords
- ✅ Privacy policy text
- ✅ Review notes
- ✅ Release notes

Review and customize as needed!

### ✅ Step 4.3: Setup Support URLs

**Option A: Use GitHub (Easy)**
- Support URL: `https://github.com/yetanothersidequest/fechtonomicon`
- Privacy URL: `https://github.com/yetanothersidequest/fechtonomicon/blob/main/PRIVACY.md`

**Option B: Create Simple Pages**
Host on Netlify (you're already using it):
1. Create `public/privacy.html` and `public/support.html`
2. Deploy to Netlify
3. Use those URLs

For now, GitHub URLs work fine!

---

## Phase 5: Submit to App Store Connect (30 minutes)

### ✅ Step 5.1: Submit Build
Once your build is complete:
```bash
./scripts/submit-ios.sh
```

Or manually:
```bash
eas submit --platform ios --latest
```

**You'll be prompted for:**
- Apple ID: `caleb@yetanothersidequest.com` (or your Apple ID)
- App-specific password: [Use the one you created in Step 2.2]

### ✅ Step 5.2: Wait for Processing
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Your app → **TestFlight** tab
3. Wait 10-30 minutes for build to process
4. Status will change from "Processing" to "Ready to Submit"

### ✅ Step 5.3: Fill in App Information

Go to **App Store** tab → **1.0 Prepare for Submission**

#### A. App Information
- **Name:** Fechtonomicon
- **Subtitle:** HEMA Flashcards & Study Guide
- **Privacy Policy URL:** Your URL from Step 4.3

#### B. Category
- **Primary Category:** Education
- **Secondary Category:** Reference

#### C. Age Rating
Click **Edit**, answer questionnaire:
- All questions: **None**
- Result: **4+**

#### D. App Privacy
Click **Get Started**, complete privacy questionnaire:
- **Do you collect data?** No (since all data is local)
- If using PostHog: Select Analytics data types

#### E. Pricing and Availability
- Already set to **Free** in Step 2.4
- Verify it's correct

### ✅ Step 5.4: Prepare for Submission Section

#### A. Screenshots
1. Click **iPhone 6.7 Display**
2. Upload your screenshots (drag & drop)
3. Repeat for iPad if supporting tablets

#### B. Description
1. **Promotional Text** (170 chars max):
   ```
   Master Historical European Martial Arts with beautifully designed flashcards. Study longsword techniques from legendary masters like Joachim Meyer.
   ```

2. **Description** (4000 chars max):
   Copy from `APP_STORE_CONTENT.md` → Full Description section

3. **Keywords** (100 chars max):
   ```
   hema,longsword,fencing,martial arts,flashcards,study,medieval,sword,meyer,historical
   ```

4. **Support URL:**
   ```
   https://github.com/yetanothersidequest/fechtonomicon
   ```

5. **Marketing URL:** (optional - leave blank for now)

#### C. Build
1. Click **"+"** next to Build
2. Select your uploaded build
3. Export Compliance:
   - **Does your app use encryption?**
   - Select **No** (or **Yes** if only using HTTPS - which is exempt)

#### D. Version Information
**What's New in Version 1.0.0:**
```
🎉 Welcome to Fechtonomicon!

Your new companion for studying Historical European Martial Arts.

✨ FEATURES:
• Beautiful medieval-themed flashcards
• German & Italian longsword terminology
• Swipe-based learning interface
• iOS home screen widget
• Offline learning - no internet required
• Progress tracking
• Related card suggestions
• Video tutorials
• Historical source citations

⚔️ Start your HEMA journey today!
```

#### E. App Review Information
- **First Name:** Caleb
- **Last Name:** [Your last name]
- **Phone Number:** [Your phone number]
- **Email:** caleb@yetanothersidequest.com
- **Demo Account:** Not required (no login)
- **Notes:**
  ```
  Thank you for reviewing Fechtonomicon!

  This is an educational flashcard app for Historical European Martial Arts (HEMA).

  KEY POINTS:
  - No user accounts or login required
  - All data stored locally on device
  - Widget displays random flashcards on home screen
  - No in-app purchases or subscriptions

  DEMO INSTRUCTIONS:
  1. Open the app
  2. Swipe through flashcards
  3. Tap cards for full details
  4. Use search tab to find terms

  WIDGET TESTING:
  1. Long-press home screen
  2. Tap "+" to add widget
  3. Search for "Fechtonomicon"

  NSAppTransportSecurity exceptions are set for YouTube domains only for embedded educational videos.

  Please contact me with any questions!
  ```

#### F. Version Release
- Select **Manually release this version**
  (You can change to automatic later)

### ✅ Step 5.5: Submit for Review
1. Review everything one more time
2. Click **Add for Review** (top right)
3. Click **Submit to App Review**
4. Confirm submission

🎉 **Congratulations! Your app is submitted!**

---

## Phase 6: Wait for Review (24-48 hours)

### What Happens Next:

1. **Waiting for Review** (few hours - 1 day)
   - Your app is in the queue

2. **In Review** (few hours - 1 day)
   - Apple is actively reviewing
   - You'll get email updates

3. **Outcomes:**
   - ✅ **Approved** → Your app is ready to release!
   - ⚠️ **Metadata Rejected** → Minor issues with description/screenshots (easy fix)
   - ❌ **Rejected** → Issues with the app itself (need to fix and resubmit)

### If Approved:
1. You'll receive email notification
2. Go to App Store Connect
3. Click **Release this Version**
4. Your app goes live in 24 hours!

### If Rejected:
1. Read the rejection reason carefully
2. Fix the issues
3. Rebuild if needed: `./scripts/build-ios.sh`
4. Resubmit: `./scripts/submit-ios.sh`
5. Update app info if needed
6. Click **Submit for Review** again

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Check credentials
eas credentials

# Clear and regenerate
eas credentials --platform ios --profile production
```

### "Invalid Bundle" Error
- Ensure version and build number are correct in app.json
- Build number should increment with each submission

### Submission Fails
- Verify App-specific password is correct
- Ensure Apple ID matches your developer account
- Check that app exists in App Store Connect

### Processing Takes Too Long
- Normal: 10-30 minutes
- If > 1 hour, check App Store Connect for errors
- Try refreshing the page

### Missing Compliance Info
- For encryption: Select "No" or specify HTTPS-only
- For widget: No special compliance needed

---

## 📋 Quick Reference Commands

```bash
# Install/Setup
npm install -g eas-cli
eas login
eas whoami

# Build
./scripts/build-ios.sh
# OR: eas build --platform ios --profile production

# Submit
./scripts/submit-ios.sh
# OR: eas submit --platform ios --latest

# Check status
eas build:list
eas submit:list

# Verify app is ready
yarn validate
yarn test:ci
```

---

## 🎯 Common First-Time Mistakes

1. ❌ Forgetting to create app in App Store Connect first
2. ❌ Not having app-specific password ready
3. ❌ Missing required screenshots
4. ❌ No privacy policy URL
5. ❌ Not answering age rating questionnaire
6. ❌ Forgetting to select a build in "Prepare for Submission"
7. ❌ Not filling in "App Review Information"

**This guide covers all of these!** ✅

---

## 🚀 After Approval

### Celebrate! 🎉
Your app is live on the App Store!

### Next Steps:
1. **Share your app:**
   - App Store link: `https://apps.apple.com/app/[your-app-id]`
   - Share on social media
   - Tell your HEMA friends!

2. **Monitor:**
   - Check App Store Connect for analytics
   - Watch for crash reports
   - Read user reviews

3. **Plan Updates:**
   - Fix any bugs reported
   - Add requested features
   - Update content

### Future Updates:
```bash
# 1. Update version in app.json
# 2. Build new version
./scripts/build-ios.sh

# 3. Submit
./scripts/submit-ios.sh

# 4. In App Store Connect:
#    - Create new version
#    - Update "What's New"
#    - Select new build
#    - Submit for review
```

---

## 📞 Need Help?

- **EAS Issues:** https://docs.expo.dev/submit/ios/
- **App Store Connect:** https://developer.apple.com/support/
- **This Project:** GitHub Issues

---

## ✅ Final Checklist

Before clicking "Submit for Review", verify:

- [ ] App builds successfully
- [ ] All tests pass (`yarn test:ci`)
- [ ] All validation passes (`yarn validate`)
- [ ] Screenshots uploaded (all required sizes)
- [ ] App name, subtitle filled
- [ ] Description and keywords added
- [ ] Category selected (Education)
- [ ] Age rating completed (4+)
- [ ] Privacy policy URL added
- [ ] Support URL added
- [ ] Build selected
- [ ] Export compliance answered
- [ ] Release notes added
- [ ] App review information filled (name, email, phone, notes)
- [ ] Pricing set (Free)
- [ ] Territories selected
- [ ] No critical bugs or crashes

---

**You've got this!** 💪⚔️

Follow this guide step-by-step, and you'll have your app submitted in about an hour.

Good luck with your submission! 🚀
