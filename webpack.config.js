const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/catclicker.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};