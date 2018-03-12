const webpack = require('webpack');
const path = require('path');

const baseUrls = {
  production: 'https://mws-restaurant-1519596698262.firebaseapp.com/',
  development: 'http://localhost:8080/',
};

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
  const currentEnv = env.production ? 'production' : 'development';
  
  config.plugins = [
    new webpack.DefinePlugin({
      'BASE_URL': JSON.stringify(baseUrls[currentEnv]),
    }),
  ];
  
  return config;
};