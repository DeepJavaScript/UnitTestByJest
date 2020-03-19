# Jest Unit Test - Week_1 - Getting start
這是 Jest Unit Test 讀書會的第一週，透過 Jest Document 來學習，第一週試著透過文件來安裝 Jest，做第一個簡單的測試。

## 使用 npm 套件工具管理
```shell
$ npm init
```

## 安裝 Jest
在專案內安裝 Jest，指定安裝為 devDependencies，因為專案上架時不需要用到 Jest，可以減少雲端的檔案大小。
```shell
$ npm install --save-dev jest
```

## 建立 Jest 的設定檔
- 免去執行 `jest init`，還要寫 package.json 的腳本，直接使用 `npx` 就可以了，它會到 node_modules/bin 去找環境變數 `$PATH`，執行 Jest 的安裝指令。
- 執行後會產生一支叫 jest.config.js 的檔案，就是 Jest 的設定檔。
```shell
$ npx jest init
```  
<!-- 
## 建立 .gitignore
新增並編輯 .gitignore，將上架不需要用到的檔案都忽略掉。

```shell
$ vim .gitignore
```
將 node_modules 及 .DS_Store 忽略掉。
```vim
node_modules
*.DS_Store
``` -->

## 寫一個待測試的 .js
- 寫一個簡單的 sum 函式，內部運算 `a 參數 + b 參數`。
- 再將它輸出成一個 module，名叫 `sum`。
```JavaScript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

## 建立測試檔
- 聲明一個常數 `sum`，將待測試的 .js 檔引入（注意相對路徑要對）。
- 將測試訊息 `'adds 1 + 2 to equal 3'` 寫入，後面帶一個函式來測試 `sum(1, 2)`，會得到預期的 `toBe(3)`。
```JavaScript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

## 在 package.json 中寫入測試腳本
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

## 跑測試
```shell
$ npm run test
```
測試成功的訊息：
![](https://i.imgur.com/dzaXZHd.png)
