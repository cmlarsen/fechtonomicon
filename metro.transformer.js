const svgTransformer = require('react-native-svg-transformer');
const defaultTransformer = require('metro-babel-transformer');

module.exports = {
  transform({ src, filename, options }) {
    if (filename.endsWith('.svg')) {
      return svgTransformer.transform({ src, filename, options });
    }

    // For web platform, always transform zustand to handle import.meta
    if (options.platform === 'web' && filename.includes('zustand')) {
      return defaultTransformer.transform({
        src,
        filename,
        options: {
          ...options,
          // Force Babel transformation for this file
          enableBabelRuntime: true,
        },
      });
    }

    return defaultTransformer.transform({ src, filename, options });
  },
};
