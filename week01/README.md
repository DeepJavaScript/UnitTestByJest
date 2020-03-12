# Week 01 - Get Started(Jest environment setting)

Node version : v10.16.0

## global install

### step 1 - install Jest globally

yarn : `yarn global add jest`
npm : `npm install jest --global`

## local install

### step1 - install Jest

yarn : `yarn add --dev jest`
npm : `npm install --save-dev jest`

### step 2 - set script for running test to package.json

```javascript
{
  "script": {
    "test": "jest"
  }
}
```

If single file test, can be specified path in `package.json`

```Javascript
{
  "scripts": {
    "test": "jest --watchAll --runTestsByPath ＝./jest_test/*.js"
  },
}
```

較新的 Node 的版本, 可以以`npx jest [fileName].test.js` 來執行測試。
For newer Node versions, tests can be performed with `npx jest [fileName] .test.js`.

## jest with babel

yarn : `yarn add --dev babel-jest @babel/core @babel/preset-env`
npm : `npm install --save-dev babel-jest`

configure Babel to target current version of Node by creating config.js
通過在項目的根目錄中創建 Babel.config.js 文件，配置 Babel 以針對當前版本的 Node:

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
};
```

## Jest with TypeScript

yarn : `yarn add --dev @babel/preset-typescript`
