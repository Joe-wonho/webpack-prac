# Webpack 사용 가이드

- 먼저 필요한 패키지 설치

```bash
$ npm i -D webpack webpack-cli webpack-devserver@next
```

- **package.json**에서 scripts 부분 세팅

```javascript
"scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
```

- 개발 서버를 열기 위해 **webpack.config.js**를 root 경로에 만들어준다. 그 다음 세팅을 해준다.

```javascript
const path = require('path'); // node js 에서 사용할 수 있는 path 라는 전역 모듈 가져오기

module.exports = {
  //parcel index.html
  // 파일을 읽어들이기 시작하는 진입점 설정, 보통 html이아닌 js를 진입점으로 삼는다.
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // 기본값으로 dist가 설정되어 있어서 주석
    // __dirname 은 node js에서 사용할 수 있는 전역 변수로 현재 파일이 있는 그 경로를 지칭한다. resolve는 인수 1 과 인수 2를 합쳐서 경로를 내어준다. dist도 다른 폴더의 이름으로 설정할 수 있다.

    // filename: 'main.js', //생성될 파일 이름 다른 이름으로 작성해도 된다. 위에 entry가 기본값.
    clean: true, //옵션을 바꾸고 다시 실행시 기존파일을 삭제하고 현재파일로 대신함.
  },
};
```

---

- 개발 서버의 index.html 을 불러오기 위한 방법
- plugin 설치

```bash
$ npm i -D html-webpack-plugin
```

- **webpackconfig.js** 에서 옵션 설정

```javascript
const path = require('path');
const HtmlPlugin = require ('html-webpack-plugin'); //가져오기
module.exports = {
 // ~~~
 clean: true,
  },
  //~~~~~~~~~~~~~~~~~~~~~~~~~
  //번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html',
    }),
  ],

  devServer: {
    host: 'localhost', //주소 만들어주기
  },
}
```

---

- 정적파일 연결하기
- static 폴더에 favicon파일, images폴더 + imgage 파일 넣고 패키지 설치

```bash
$ npm i -D copy-webpack-plugin
```

- 다음으로 **config.js** 에서 옵션 세팅

---

- root 경로에 있는 css 파일 연결하기
  - main.js에 세팅하기
    ```javasript
    import './css/main.css'
    ```
  - webpack 은 entry 가 main.js 이기에 webpack 은 main.js를 먼저 읽으므로 연결된 css파일을 읽어준다. 그리고 index.html 과 섞어서 dist라는 폴더로 내어준다.
  - 하지만 webpack 이 css 파일을 내어줄 뿐 아직 읽지 못하므로
    패키지 설치가 필요하다.
    ```bash
    $ npm i -D css-loader style-loader
    ```
    config.js에 옵션 세팅 (output 과 plugin 사이에 작성)
    ```javascript
        module: {
      rules: [
        {
          test: /\.css$/, //.css로 끝나는 확장자를 가진 팡일 찾기
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    ```

---

- scss파일도 위와 같이 css파일 연결과 비슷하다. root경로의 scss파일 연결을 위해 패키지 설치하고 config.js의 옵션을 변경한다. use 배열에 'sass-loader' 추가

```bash
$ npm i -D sass-loader sass
```

---

- 공급업체 접두사 붙이기 (autoprefixer)

```bash
$ npm i -D postcss autoprefixer postcss-loader
```

```javascript
 module: {
    rules: [
      {
        test: /\.s?css$/, //.css (s가 있을 수 없을 수도 있는)로 끝나는 확장자를 가진 파일 찾기
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      }, //순서가 중요 sass 전에 postcss 로더가 들어가야 한다.
    ],
  },
```

- 다음으로 package.json에서 어떤 대상의 브라우저를 지원하는지를 옵션을 설정 해야한다.
  ```javascript
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
  ```
- 그리고 **.postcssrc.js** 파일을 root 경로에 생성후

```javascript
module.exports = {
  plugins: [require('autoprefixer')],
};
```

---

- **babel** 사용하기

```bash
$ npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime
```

- 패키지 설치후 **.babelrc.js** 생성 후 코드작성

```javascript
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [['@babel/plugin-transform-runtime']],
};
```

- 그 다음 config.js 에

```javascript
 module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      { //이 곳 추가
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ],
  },
```

- 마지막으로 babel-loader 패키지 설치

```bash
$ npm i -D babel-loader
```

---

## netrify 배포

- npm 프로젝트 배포 방법
- 제품화 시키기 위해서는 내가 만든 명령어를 적어야 한다.

```bash
$ npm run build
```

- 그리고 build 된 결과물이 어디에 저장되는 지를 지정해야하는데 여기서는 **dist/** 폴더이므로 그에 맞게 지정해 주면된다.
