module.exports = {
  entry: `./js/app.js`,
  mode: `development`,
  output: {
    path: `${__dirname}/dist`,
    filename: `bundle.js`,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          `style-loader`,
          `css-loader`,
          `sass-loader`,
        ],
      },
      {
        test: /\.(svg|gif|png|eot|woff2?|ttf)$/,
        use: [
          `url-loader`,
        ],
      },
    ],
  },
}
