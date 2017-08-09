/*
 * See: https://github.com/postcss/postcss-loader#usage
 */

module.exports = {
  plugins: {
    autoprefixer: {
      browsers: [
        'last 1 versions',
        'not ie < 11',
      ],
    },
    // 'cssnano': {}
  },
};
