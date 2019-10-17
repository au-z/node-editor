const path = require('path')
const webpack = require('webpack')

const VueWebpackPlugin = require('vue-loader/lib/plugin.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/main.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(j|t)s$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
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
      'three': path.resolve(__dirname, 'node_modules/three/build/three.module.js'),
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
