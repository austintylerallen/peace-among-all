const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Loaders to process CSS
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // Match image files
        use: ['file-loader'], // Loaders to process images
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // File extensions to resolve
  },
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve content from the 'dist' directory
    compress: true,
    port: 3000, // Port to run the dev server
    historyApiFallback: true, // Enable support for HTML5 history API
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Template HTML file
      filename: 'index.html', // Output HTML file
    }),
  ],
};
