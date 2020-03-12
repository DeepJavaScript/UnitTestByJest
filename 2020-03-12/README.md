# Getting Started

## 建立環境

在根目錄建立 npm project
安裝開發工具 jest

```
npm init -y
npm install --save-dev jest
```

## 寫程式

建立聚會日期的資料夾，進入

建立產品程式的模組

**sum.js**

```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

產品程式進入點

**app.js**

```javascript
const sum = require('./sum');

console.log(sum(1, 2));
```

執行

```shell
chris$ node ./2020-03-12/app.js 
3
```

## 測試

**sum.test.js**

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

執行測試

```shell
chris$ npx jest
 PASS  2020-03-12/sum.test.js
  ✓ adds 1 + 2 to equal 3 (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.284s
Ran all test suites.
```

# 使用

可以直接用 cli 執行。([看更多](https://jestjs.io/docs/en/cli))

```shell
jest my-test --notify --config=config.json
```

- my-test: 指定自己的檔案
- `--notify`: 給一個推播
- `--config=config.json`: 指定 config 檔 (config.json)

## Jest 的 config

叫出 config

```shell
jest init
```

```shell
chris$ npx jest --init

The following questions will help Jest to create a suitable configuration for your project

✔ Would you like to use Jest when running "test" script in "package.json"? … yes
✔ Choose the test environment that will be used for testing › node
✔ Do you want Jest to add coverage reports? … yes
✔ Automatically clear mock calls and instances between every test? … yes

✏️  Modified /Users/chris/code/UnitTestByJest/package.json

📝  Configuration file created at /Users/chris/code/UnitTestByJest/jest.config.js
```

這樣就產生了 jest.config.js
