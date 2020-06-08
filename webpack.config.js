const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    background: path.join(__dirname, 'src/background.ts'),
    popup: path.join(__dirname, 'src/popup.ts'),
    options: path.join(__dirname, 'src/options.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
