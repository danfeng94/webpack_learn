const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // 入口文件
  output: {
    // webpack打包后出口文件
    filename: "app.js", // 打包后js文件名称
    path: path.resolve(__dirname, "dist"), // 打包后自动输出目录
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:5]",
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:5]",
              },
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      { test: /\.(png|svg|jpg|gif)$/, use: ["url-loader"] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ["url-loader"] },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: "GoldCoast", template: "./index.html" }),
    new CleanWebpackPlugin(),
  ],
  // 省略文件扩展名
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css", "json"],
  },
  devServer: {
    open: true,
    contentBase: path.join(__dirname, "../dist"),
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    hot: true, // 开启热更新,
    port: 8080,
  },
};
