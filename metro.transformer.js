const svgTransformer = require('react-native-svg-transformer');

module.exports.transform = async ({ src, filename, options }) => {
  if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ src, filename, options });
  }

  // For non-SVG files, use the Expo transformer that's built into react-native-svg-transformer
  const getExpoTransformer = () => {
    try {
      return require('@expo/metro-config/babel-transformer');
    } catch (_error) {
      return require('metro-babel-transformer');
    }
  };

  const expoTransformer = getExpoTransformer();
  return expoTransformer.transform({ src, filename, options });
};
