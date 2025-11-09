module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-transform-import-meta',
        {
          module: 'ES6',
        },
      ],
      'react-native-reanimated/plugin',
    ],
    overrides: [
      {
        test: /node_modules/,
        plugins: [
          [
            'babel-plugin-transform-import-meta',
            {
              module: 'ES6',
            },
          ],
        ],
      },
    ],
  };
};
