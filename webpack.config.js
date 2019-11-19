/* eslint-disable no-multi-spaces */

const path = require('path')
const webpack = require('webpack')

const VueWebpackPlugin = require('vue-loader/lib/plugin.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const load = (regex, use, exclude = true) => ({test: regex, use, exclude: exclude ? /node_modules/ : undefined})

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/main.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      load(/\.vue$/,              ['vue-loader']),
      load(/\.(j|t)s$/,           ['babel-loader']),
      load(/\.(js|vue)$/,         ['eslint-loader']),
      load(/\.(glsl|vert|frag)$/, ['webpack-glsl-loader']),
      load(/\.css$/,              ['style-loader', 'css-loader'], false),
      load(/\.styl(us)?$/,        ['style-loader', 'css-loader', 'stylus-loader']),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, 'src/'),
      'style': path.resolve(__dirname, 'src/style'),
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, 'src/static'), to: 'static'},
    ]),
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      inject: 'body',
      template: path.resolve(__dirname, 'index.html'),
    }),
    new VueWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    open: true,
    port: 9001,
  },
  devtool: '#eval-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
  },
}

if (module.exports.mode === 'production') {
  module.exports.plugins = (module.exports.plugins).concat([
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    new webpack.LoaderOptionsPlugin({minimize: true}),
  ])
} else {
  module.exports.plugins = (module.exports.plugins).concat([])
}
