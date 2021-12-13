const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = false;

module.exports = {
  entry: "./src/index.js", // Dẫn tới file index.js ta đã tạo
  // cấu hình đầu ra
  output: {
    path: path.join(__dirname, "/build"), // Thư mục chứa file được build ra
    filename: "bundle.js" // Tên file được build ra
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Sẽ sử dụng babel-loader cho những file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: ["babel-loader"]
      },
      {
        test: /\.(sa|sc)ss$/, // Sẽ sử dụng babel-loader cho những file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          // Interprets CSS
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        {
          // minify CSS và thêm autoprefix
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',

            // Đặt chế độ tối ưu
            plugins: devMode
              ? () => []
              : () => [
                postcssPresetEnv({
                  browsers: ['>1%']
                }),
                require('cssnano')()
              ]
          }
        },
        {
          loader: 'sass-loader'
        }],
      },
      {
          // Thiết lập lưu các ảnh sử dụng bởi CSS
          // lưu dưới đường dẫn images cùng file site.css
          test: /\.(png|jpe?g|gif)$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      // Image sử dụng bởi CSS lưu tại
                      publicPath: '../images',
                      emitFile: false
                  }
              }
          ]
      }
    ]
  },
  // Chứa các plugins sẽ cài đặt trong tương lai
  plugins: [
    // Xuất kết quả với CSS - sau khi qua loader MiniCssExtractPlugin.loader
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/site.css' : 'css/site.min.css'
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
