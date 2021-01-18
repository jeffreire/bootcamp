  
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      // Modulo para importar js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      // Modulo para importar css
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      // Modulo de extensão para imagens
      {
        test: /.*\.(gif|png|jpg?g)$/i,
        use: {
          loader: 'file-loader',
        }
      }
    ]
  },
}