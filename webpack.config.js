const path = require(`path`)

module.exports = {
  entry: `./src/js/app.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: `bundle.js`,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [`style-loader`, `css-loader`, `sass-loader`],
      },
      {
        test: /\.(svg|gif|png|eot|woff(2)?|ttf)$/,
        use: [`url-loader`],
      },
    ],
  },
  // dev-specific content
  mode: `development`,
  devtool: `inline-source-map`,
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, `./dist`),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
}
