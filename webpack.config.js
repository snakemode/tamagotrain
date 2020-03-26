const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(path.join(process.cwd(), 'public'));
console.log(path.resolve(__dirname, 'public'));

module.exports = {
  mode: 'development',
  entry: { index: './src/script.js' },
  plugins: [
    // new CleanWebpackPlugin(['dist'])
    // new HtmlWebpackPlugin()
  ],
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'public'),    
    library: 'train',
    libraryTarget: 'var'
  }
};