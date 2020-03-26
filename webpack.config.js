const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log(path.join(process.cwd(), 'public'));
console.log(path.resolve(__dirname, 'public'));

module.exports = {
  mode: 'development',
  entry: { index: './src/script.js' },
  plugins: [
    // new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: "/public/"
  }
};