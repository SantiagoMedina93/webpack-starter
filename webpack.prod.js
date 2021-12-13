
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
  mode:'production',
  entry: './src/index.js',

  output: {
      path: __dirname + '/dist',
      filename: 'main.[contenthash].js',
      //Limpia los archivos html 
      clean: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          // Disables attributes processing
          sources: false,
          //Minimizar para produccion 
          minimize: false
        },
      },
      {
        test: /\.css$/i,
        exclude: /styles.css$/,
        use:['style-loader', 'css-loader']
      },
      {
        test:/styles.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test:/\.(png|jpe?g|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },

  optimization:{
    minimize: true,
    minimizer: [
      new CssMinimizer(),        
      new Terser()
    ]
  },


  plugins: [
    new HtmlWebpackPlugin({
        //Titulo del index generado
        title: 'Mi Webpack App',
        //nombre del archivo HTML
        filename: 'index.html',
        //Archivo en el que se basa la generación del nuevo index
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/", to: "assets/" }
        
      ],
      options: {
        concurrency: 100,
      },
    }),
  ]
}