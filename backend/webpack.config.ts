import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = (urlPath: string) => {
  return {
    entry: path.join(__dirname, 'src/View/main.js'),
    output: {
      path: path.join(__dirname, `assembledHTML/${urlPath}`),
      publicPath: './',
      filename: 'js/bundle.js',
    },
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
          options: {
            // Path to your custom js file, which has Handlebars with custom helpers registered
            helperDirs: path.join(__dirname + '/src/View/handlebars'),
          },
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: (url, resourcePath, context) => {
                  // `resourcePath` is original absolute path to asset
                  // `context` is directory where stored asset (`rootContext`) or `context` option
                  // To get relative path you can use
                  // const relativePath = path.relative(context, resourcePath);

                  if (/screenshots/.test(resourcePath)) {
                    return `images/screenshots/${url}`;
                  }

                  if (/usersAvatars/.test(resourcePath)) {
                    return `images/usersAvatars/${url}`;
                  }

                  return `images/${url}`;
                },
              },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2?g)$/,
          loader: require.resolve('file-loader'),
          options: {
            name: '[name].[ext]?[hash]',
            outputPath: 'assets/',
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
        allChunks: false,
      }),
      new OptimizeCssAssetsPlugin(),
      new CleanWebpackPlugin(),
    ],
  };
};
