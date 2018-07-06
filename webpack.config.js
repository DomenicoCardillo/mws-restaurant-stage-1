const webpack = require('webpack');
const path = require('path');
const CONFIG = {};
CONFIG.LOC = require('./config-loc');
CONFIG.PROD = require('./config-prod');

const config = {
  entry: {
    index: './js/index.js',
    restaurant: './js/restaurant.js',
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'dist/[name].js',
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
    ],
  },
};

module.exports = env => {
  const currentEnvironment = env.production ? 'PROD' : 'LOC';
  
  config.plugins = [
    new webpack.DefinePlugin({
      'BASE_URL': JSON.stringify(CONFIG[currentEnvironment].HOST),
    }),
  ];
  
  return config;
};