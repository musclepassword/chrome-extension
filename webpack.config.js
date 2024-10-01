const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: path.resolve(__dirname, './src/pages/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js', // Change this to 'bundle.js' for clarity
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Use .jsx to handle both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|gif|svg|pdf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
