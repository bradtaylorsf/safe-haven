const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const clientDir = path.join(__dirname, '../client');
const publicDir = path.join(__dirname, '../public');

const IS_DEV = (process.env.NODE_ENV === 'development');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&timeout=20000';

const prodPlugins = !IS_DEV ? [
  // Note: don't use '-p' in "prod:build" script

  new webpack.optimize.CommonsChunkPlugin({
    names: ['manifest'],
    minChunks: Infinity,
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    quiet: true,
  }),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,    // Enables tree shaking
      dead_code: true, // Enables tree shaking
      pure_getters: true,
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      comparisons: true,
      sequences: true,
      evaluate: true,
      join_vars: true,
      if_return: true,
    },
    mangle: {
      except: ['DOMPurify'],
      reserved: ['DOMPurify'],
    },
    output: {
      comments: false,
    },
    sourceMap: false, // Disabling for now
  }),

  new CopyWebpackPlugin([
    { from: `${clientDir}/root`, to: `${publicDir}/assets` },
  ]),

] : [];

module.exports = {
  // target: 'node',
  node: {
    fs: 'empty',
    child_process: 'empty',
  },
  externals: [
    { pg: true },
  ],
  devtool: IS_DEV ? 'cheap-eval-source-map' : 'cheap-module-source-map',
  entry: {
    safehaven_vendor: [
      'lodash',
      'tether',
      'dompurify',
      // 'raven',
    ],
    safehaven: IS_DEV ? [
      hotMiddlewareScript,
      path.join(clientDir, 'scripts/safehaven.js'),
    ] : [
      path.join(clientDir, 'scripts/safehaven.js'),
    ],
  },
  output: {
    // filename: IS_DEV ? 'assets/scripts/[name].js' : 'assets/scripts/[name].[chunkhash].js',
    filename: 'assets/scripts/[name].js',
    // chunkFilename: IS_DEV ?
    //   'assets/scripts/[name].chunk.js' : 'assets/scripts/[name].[chunkhash].chunk.js',
    path: IS_DEV ? clientDir : publicDir,
    // publicPath: IS_DEV ? 'http://webpack:3000/' : '/',
    publicPath: '/',
    sourceMapFilename: 'assets/scripts/[name].js.map',
  },
  // watch: IS_DEV,
  // stats: 'verbose',
  resolve: {
    modules: ['node_modules', clientDir],
    extensions: ['.js', '.json', '.css', '.sass', '.scss', '.less', '.html', '.hbs', '.handlebars'],
    alias: {
      lodash: 'lodash/lodash',
      parsley: 'parsleyjs/dist/parsley',
      dompurify: 'dompurify/src/purify',
      mixitup: 'mixitup/dist/mixitup',
    },
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: IS_DEV ? 'auto' : true,
          presets: ['es2015', 'stage-0'],
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': IS_DEV ? JSON.stringify('development') : JSON.stringify('production'),
      // 'process.env.PUBLIC_PATH': JSON.stringify(publicDir),
    }),

    new webpack.HotModuleReplacementPlugin({ multiStep: true }),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.NamedModulesPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      // 'window.jQuery': 'jquery',
      // 'root.jQuery': 'jquery',
      _: 'lodash',
      Tether: 'tether',
      Parsley: 'parsley',
      DOMPurify: 'dompurify',
      // Raven: 'raven',
      /** Note: Using `exports-loader` for bootstrap until UglifyJS supports ES6  */
      /** https://github.com/mishoo/UglifyJS2/issues/448  */
      // Util: 'exports-loader?Util!bootstrap/js/dist/util',
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true,
      stats: {
        colors: true,
      },
      options: {
        context: clientDir,
        output: {
          path: 'public/assets/styles',
        },
      },
      eslint: {
        failOnWarning: false,
        failOnError: true,
      },
    }),

    new ExtractTextPlugin({
      // filename: IS_DEV ? 'assets/styles/main.css' : 'assets/styles/main.[chunkhash].css',
      filename: 'assets/styles/main.css',
      // disable: false,
      disable: IS_DEV,
      allChunks: true,
    }),

  ].concat(prodPlugins),
};
