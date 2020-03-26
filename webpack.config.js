const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: { index: './public-src/script.js' },
  plugins: [
    // new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: 'packed-script.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: ''
  }
};