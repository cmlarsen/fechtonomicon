const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('ttf');

// Add web support
config.resolver.sourceExts = [...config.resolver.sourceExts, 'web.js', 'web.ts', 'web.tsx'];

module.exports = config;
