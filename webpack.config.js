const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const Copyplugin = require('copy-webpack-plugin');
module.exports = {
  //parcel index.html
  // 파일을 읽어들이기 시작하는 진입점 설정, 보통 html이아닌 js를 진입점으로 삼는다.
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.s?css$/, //.css (s가 있을 수 없을 수도 있는)로 끝나는 확장자를 가진 파일 찾기
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ],
  },

  //번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html',
    }),
    new Copyplugin({
      patterns: [
        { from: 'static' }, //dist 로 들어갈 폴더 설정(build 후)
      ],
    }),
  ],

  devServer: {
    host: 'localhost', //주소 만들어주기
  },
};
