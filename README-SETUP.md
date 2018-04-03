## GMobile Boilerplate
### init
```sh
$ npm init
$ git init
$ git add .
$ git commit -m "first commit"
$ git remote add origin git@github.com:jimmybae/gmobile-boilerplate.git
$ git push -u origin master
```

### webpack
```sh
$ npm i webpack --save-dev
$ npm i webpack-cli --save-dev
```

## Jest
```sh
$ npm i -D jest
```
* package.json
```json
{
  ......
  "scripts": {
    ......
    "test": "jest",
    "tdd": "jest --watch"
  },
  ......
```
```sh
$ npm run test
$ npm run tdd
```
* Error: 'fsevents' unavailable (this watcher can only be used on Darwin)
```sh
$ npm run tdd
$ npm r -g watchman
$ brew install watchman
```

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