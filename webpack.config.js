const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: './Application/src/index.ts',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        resolve: {
          extensions: ['.tsx', '.ts', '.js'],
          alias: {}
        }
      },
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          exportType: 'string',
          import: false
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        type: 'asset/resource'
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'Application/public',
          globOptions: {
            ignore: ['**/index.html']
          }
        },
        {
          from: 'Application/src/Theme',
          to: 'Theme'
        }
      ]
    }),

    new HtmlWebpackPlugin({
      template: 'Application/public/index.html'
    }),

    new Dotenv({
      file: './.env',
      defaults: './.env.dist'
    })
  ],
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  resolve: {
    fallback: {
      'typescript': false,
      'process': false
    },
    alias: {
      Application: path.resolve(__dirname, 'Application/src'),
      Core: path.resolve(__dirname, 'Core/src'),
      Infrastructure: path.resolve(__dirname, 'Infrastructure/src')
    }
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'Application/public')
    },
    proxy: {
      '/api': 'http://127.0.0.1:7072'
    }
  }
};


module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }
  return config;
};
