// Environment configuration for Netlify Functions
// This file helps ensure consistent env var usage across local and production

// Toggle this to use local Netlify Dev server instead of production
// Set to true when running `netlify dev` locally
const USE_LOCAL_FUNCTION = false;

// Local Netlify Dev server URL (when running `netlify dev`)
const LOCAL_FUNCTION_URL = 'http://localhost:8888/.netlify/functions/suggest-edit';

// Production function URL
const PRODUCTION_FUNCTION_URL = 'https://fechtonomicon.netlify.app/.netlify/functions/suggest-edit';

export const getNetlifyFunctionUrl = (): string => {
  // Priority order:
  // 1. Manual toggle (USE_LOCAL_FUNCTION)
  // 2. Environment variable (EXPO_PUBLIC_NETLIFY_FUNCTION_URL)
  // 3. Default to production

  if (USE_LOCAL_FUNCTION) {
    return LOCAL_FUNCTION_URL;
  }

  if (typeof window !== 'undefined') {
    // Client-side: use environment variable or default to production
    return process.env.EXPO_PUBLIC_NETLIFY_FUNCTION_URL || PRODUCTION_FUNCTION_URL;
  }

  // Server-side (shouldn't happen in React Native, but for completeness)
  return process.env.NETLIFY_FUNCTION_URL || PRODUCTION_FUNCTION_URL;
};
