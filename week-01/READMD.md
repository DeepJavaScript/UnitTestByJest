Week 01: Getting Started
===

## 安裝 Jest

```shell
$ npm init -y
$ yarn add --dev jest
```

## 在 `package.json` 中的 `scripts` 設定

```diff
{
  "scripts": {
+   "test": "jest"
  }
}
```

## Jest init

生成基本配置檔

```shell
# jest --init
$ yarn test --init
yarn run v1.21.1
$ jest --init

The following questions will help Jest to create a suitable configuration for your project

✔ Choose the test environment that will be used for testing › node
✔ Do you want Jest to add coverage reports? … yes
✔ Automatically clear mock calls and instances between every test? … no

📝  Configuration file created at /home/titan/.local/share/Trash/files/jest.config.js
Done in 7.41s.
```

生成的 `jest.config.js` 設定：
- `coverageDirectory`：Jest 輸出的 coverage 檔案要放在哪個目錄
  - 預設：`undefined`
- `testEnvironment`：用於測試的測試環境
  - 預設：`"jsdom"` (類似瀏覽器的環境)
  - 若要建置 node service，可用 `"node"` 來使用類似 node 的環境

```javascript
module.exports = {
  coverageDirectory: "coverage",
  testEnvironment: "node"
};
```

## 程式範例

```javascript
// src/sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```javascript
// src/main.js
const sum = require('./sum');

console.log(sum(1, 2));
```

執行：

```shell
$ node week-01/src/main.js
3
```

## 測試

```javascript
// __tests__/sum.test.js
const sum = require('../src/sum');

test('adds 1 + 2 to equal 3', () => {
  // Arrange
  let x = 1, y = 2;
  let expected = 3;

  // Act
  let actual = sum(x, y);

  // Assert
  expect(actual).toBe(expected);
});
```

執行測試：

```shell
$ yarn test
yarn run v1.21.1
$ jest
 PASS  __tests__/sum.test.js
  ✓ adds 1 + 2 to equal 3 (9ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.296s
Ran all test suites.
Done in 5.10s.
```

## 在指令列執行

- `jest <regexForTestFiles>`：match 到名為 `<regexForTestFiles>` (即 `my-test` ) 的檔案執行 Jest
- `--notify`：執行完成後顯示原生的 OS 通知
- `--config=<path>`，`-c=<path>`：使用 `<path>` (即 `config.json` ) 作為配置檔案

```shell
$ jest my-test --notify --config=config.json
```

## 使用 Babel

在安裝 Babel 前，將程式碼改成 ES6 語法：

```javascript
// src/sum.js
const sum = (a, b) => a + b;
export default sum;
```

```javascript
// src/main.js
import sum from './sum';

console.log(sum(1, 2));
```

```javascript
// __tests__/sum.test.js
import sum from '../src/sum';

test('adds 1 + 2 to equal 3', () => {
  // Arrange
  let x = 1, y = 2;
  let expected = 3;

  // Act
  let actual = sum(x, y);

  // Assert
  expect(actual).toBe(expected);
});
```

跑測試會出錯：

```shell
$ yarn test
yarn run v1.21.1
$ jest
 FAIL  __tests__/sum.test.js
  ● Test suite failed to run

    /home/titan/project/jest/UnitTestByJest/week-02/__tests__/sum.test.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import sum from '../src/sum';
                                                                                                    ^^^

    SyntaxError: Unexpected identifier

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1059:14)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        1.06s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

所以來安裝 [Babel](http://babeljs.io/)：

```shell
$ yarn add --dev babel-jest @babel/core @babel/preset-env
```

在專案根目錄建立 `babel.config.js`，此檔案用於配置與你當前 Node 版本相容的 Babel：

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

再跑測試就會通過：

```shell
$ yarn test
yarn run v1.21.1
$ jest
 PASS  __tests__/sum.test.js
  ✓ adds 1 + 2 to equal 3 (5ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.012s
Ran all test suites.
Done in 2.75s.
```

> 請參閱 [Babel官方文件](https://babeljs.io/docs/en/)。