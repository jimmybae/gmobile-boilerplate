## GMobile Boilerplate
```sh
$ npm install
$ npm run start:dev
```
browser `http://localhost:8080`

### apply webpack
- webpack-dev-server
- css loader
- babel loader
- eslint loader
- html loader
- lodash example
- html-webpack-plugin

### eslint-plugin-ackbone
[GitHub](https://github.com/ilyavolodin/eslint-plugin-backbone)

## bootstrap
```sh
npm install --save bootstrap
npm install --save jquery popper.js
```

## babel-jest
* install
[Getting Started · Jest](https://facebook.github.io/jest/docs/en/getting-started.html)
```sh
$ npm i -D jest babel-jest
```
* package.json
```json
{
  "name": "gmobile-boilerplate",
  ......
  "scripts": {
    ......
    "test": "jest",
    "test:watch": "jest --watch"
  },
  ......
```

* .babelrc
```json
{
  "presets": [["env", {"modules": false}]],
  "env": {
    "test": {
      "presets": [["env"]]
    }
  }
}
```
* execution
```sh
$ npm run test
$ npm run test:watch
```