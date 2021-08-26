const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const paths = {
  appBuild: path.resolve(__dirname, 'build'),
  appIndexHtml: path.resolve(__dirname, 'public/index.html'),
  appIndexJs: path.resolve(__dirname, 'src/index.js'),
  appSrc: path.resolve(__dirname, 'src'),
  nodePaths: path.join(__dirname, 'node_modules'),
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const appEnv = process.env.NODE_ENV || 'development';
const config = {
  mode: appEnv,
  entry: {
    main: ['whatwg-fetch', 'babel-polyfill', paths.appIndexJs],
  },
  output: {
    publicPath: '/',
    path: paths.appBuild,
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      envConfig$: path.join(paths.appSrc, 'config', 'env', appEnv + '.js'),
    },
  },
  module: {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      // {
      //   enforce: "pre",
      //   test: /\.(js|jsx)$/,
      //   exclude: paths.nodePaths,
      //   loader: 'eslint-loader',
      // },
      // Process JS with Babel.
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: paths.nodePaths,
        // Arrow functions that are members of a class are not included in es6.
        // In webpack4, arrow function is not supported until we have to include transform-class-properties plugin.
        // IE10 doesn't have Object.assign API natively.
        // So it not supported object.assign until we have to include transform-object-assign plugin.
        query: {
          plugins: ['transform-class-properties', 'transform-object-assign']
        }
      },
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // `ExtractTextPlugin` first applies the "sass" and "css" loaders
      // (second argument), then grabs the result CSS and puts it into a
      // separate file in our build process. This way we actually ship
      // a single CSS file in production instead of JS code injecting <style>
      // tags. If you use code splitting, however, any async bundles will still
      // use the "style" loader inside the async code so CSS from them won't be
      // in the main CSS file.
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      // "file" loader makes sure those assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[hash:8].[ext]',
        }
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[hash:8].[ext]',
        }
      },
    ]
  },
  plugins: [
    // The DefinePlugin allows you to create global constants which can be configured at compile time.
    // This can be useful for allowing different behavior between development builds and production builds. 
    // if (process.env.NODE_ENV === 'production') { ... }. 
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(appEnv)
      }
    }),

    // The Webpack-clean-plugin can be useful for remove/clean your dist folder(s) before building.
    new CleanPlugin(['build']),

    // The html-webpack-plugin that simplifies creation of HTML files to serve your webpack bundles.
    // This is especially useful for webpack bundles that inject a script and css files inside of html file.
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.appIndexHtml,
      inject: 'body',
      minify: true,
      chunks: ['main'],
      inlineSource: '.(js|css)$',
      env: {
        name: appEnv
      }
    }),
    new HtmlWebpackInlineSourcePlugin(),

    // The mini-css-extract--plugin, Extract text from a bundle, or bundles, into a separate file.
    // It moves all the required *.css modules in entry chunks into a separate CSS file.
    // So styles are no longer inlined into the JS bundle, but in a separate CSS file (main.css).
    // If total stylesheet volume is big, it will be faster because the CSS bundle is loaded in parallel to the JS bundle.
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),

    // The webpack-manifest-plugin is used for generating an asset manifest.
    // This will generate a manifest.json file in root output directory
    // with a mapping of all source file names to their corresponding output file.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),

    // The copy-webpack-plugin that copies individual files or entire directories to the build directory.
    new CopyWebpackPlugin([
      { from: './assets/images', to: 'images' },
    ]),
    new ESLintPlugin()
  ]
}

// The stats-webpack-plugin writes the stats of a build to a file.
// added --profile flag in config in package.json
// This will generate detailed timing measurements of build.
config.plugins.concat(new StatsPlugin('stats.json', {
  chunkModules: true,
  exclude: [/node_modules[\\\/]react/]
}));

if (appEnv === 'production') {
  // minify/uglify the JS
  config.optimization = {
    minimizer: [new UglifyJsPlugin(), new OptimizeCssAssetsPlugin({})],
  };

  // The stats-webpack-plugin writes the stats of a build to a file.
  // added --profile flag in config in package.json
  // This will generate detailed timing measurements of build.
  config.plugins.push(new StatsPlugin('stats.json', {
    chunkModules: true,
    exclude: [/node_modules[\\\/]react/]
  }));
} else {
  // add source map files to be able to debug minified code
  config.devtool = '#inline-source-map';
}

module.exports = config;