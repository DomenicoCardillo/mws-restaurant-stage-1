const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const scssMainFilePath = './src/scss/main.scss';
const extractPlugin = new ExtractTextPlugin({ filename: 'css/styles.css' });

const config = {
  entry: {
    index: ['./src/js/index.js', scssMainFilePath],
    restaurant: ['./src/js/restaurant.js', scssMainFilePath],
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'js/[name].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }
        }]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'sass-loader',
          ]
        })
      },
      // {
      //   test: /\.(png|jpe?g)$/,
      //   loader: 'responsive-loader',
      //   options: {
      //     sizes: [200, 400, 800],
      //     placeholder: true,
      //     placeholderSize: 50,
      //     adapter: require('responsive-loader/sharp'),
      //     name: '[name]-[width].[ext]',
      //     // outputPath: 'img/',
      //     // publicPath: '../img/',
      //   }
      // },
    ]
  },
  plugins: [
    extractPlugin
  ]
};

module.exports = config;