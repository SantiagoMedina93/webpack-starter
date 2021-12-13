/* const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode:'development',


    plugin: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
    ],


}; */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode:'development',
  entry: './src/index.js',

  output: {
      path: __dirname + '/dist',
      filename: 'main.js',
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
      }
    ],
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
      filename: '[name].css',
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