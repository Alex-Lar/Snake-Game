const path = require("path");

module.exports = {
  mode: "production",

  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js"],
  },
};