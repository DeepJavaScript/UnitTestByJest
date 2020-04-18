# jest week01

> 參照 [Getting Started · Jest](https://jestjs.io/docs/zh-Hans/getting-started)

### 安裝方式

1. `yarn add --dev jest`
   - yarn 的優點：
     _ 安裝變得更加快速 [Yarn](https://classic.yarnpkg.com/zh-Hans/)：由 FB 協作開發的套件管理工具，與 npm 用法相似，在下載包的過程中，會經由三個步驟 `Resolution` -> `Fetching` -> `Linking`，在 `Fetching` 過程中，yarn 會確認目前的包在 `global cache` 是否存在，若是有責不在重複下載，會從此處複製一份加快速度；無則是下載一份到此處。
     _ 已經安裝過的包可離線安裝，**安裝變得更加快速** 。
     _ 安裝包同 `npm` 爲 `package.json` 可以快速回到 `npm` 方式。
     _ 與 `nom` 指令對照 [Migrating from npm | Yarn](https://classic.yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison) \* 深入 [Yarn: A new package manager for JavaScript - Facebook Engineering](https://engineering.fb.com/web/yarn-a-new-package-manager-for-javascript/)
2. `npm install --save-dev jest` **本次使用**
   - `--dev` 是什麼？
     _ `--save` 代表安裝、也寫入 `dependencies` 表示此包在發表的產品中仍需使用。
     _ `--save -dev` 代表安裝、也寫入 `devDependencies` 表示此包在發表的產品中不需要使用。 \* 參考 [弄懂 npm install 的 –save 與 –save-dev – 學．誌｜ Chris Kang](https://chriskang028.wordpress.com/2017/07/05/%E5%BC%84%E6%87%82-npm-install-%E7%9A%84-dependencies-v-s-devdependencies/)

### 測試

建立如下的專案：
![file](https://i.imgur.com/Ro2Ymcp.png)

1. 先安裝 `npm init` 初始化專案 1. 懶人可開 `npm init -y` 空白專案：適合我。
2. 安裝 `npm install --save-dev jest` 在開發環境需要用 `-dev`
3. 建立要測試的 `ooxx.js` 檔案。
4. 建立要測試 `ooxx.js` 的測試檔案 `ooxx.test.js`
5. 在 `package.json` 中的 `script` 加入指令：

**要測試的檔案**
其中 `export` 便是稍後要傳入 `ooxx.test.js` 中測試的函數，函式為此處測試單位。

1. `如何測試兩隻以上函數`
   - 使用 `export` 傳出 `{fun1, fun2}`

```javascript
function handler(a, b) {
  try {
    const datas = [a, b];
    filterNumber(datas);
    return sum(datas);
  } catch (e) {
    return e.message;
  }
}

function filterNumber(datas) {
  const dataIsNumber = /\d/;
  const validate = datas.every((value) => dataIsNumber.test(value));
  if (!validate) throw Error("輸入的數值有誤，請輸入正確數值");
}

function sum(datas) {
  return datas.reduce((acc, cur) => {
    return acc + cur;
  });
}

module.exports = { handler, sum, filterNumber };
```

**實際包含測試的測試檔案** 1. 此處 `toBe()` 為其中一種測試方式，更多第二章中會詳細介紹。

```javascript
const handler = require("./sum");

test("1 + 2 = 3", () => {
  expect(handler.handler(1, 2)).toBe(3);
});
test("undefined + 2 = 輸入的數值有誤，請輸入正確數值", () => {
  expect(handler.handler(undefined, 2)).toBe("輸入的數值有誤，請輸入正確數值");
});

test("1 + 2 = 3", () => {
  expect(handler.sum([1, 2])).toBe(3);
});
test("4 + 2 = 6", () => {
  expect(handler.sum([4, 2])).toBe(6);
});
```

測試結果便如下：
![file](https://i.imgur.com/LTerube.png)

加上 `--coverage` 可以產生覆蓋率報告，檢查目前函數的覆蓋率：
![file](https://i.imgur.com/idXywET.png)

加上 `-watch` 便可以動態監聽

### coverage 覆蓋率報告：

> 詳情：[How to read Test Coverage report generated using Jest.](https://medium.com/@krishankantsinghal/how-to-read-test-coverage-report-generated-using-jest-c2d1cb70da8b) 寫得很好。

### 如何查看 全局 nom yarn 安裝包：

> [yarn global | Yarn](https://classic.yarnpkg.com/zh-Hans/docs/cli/global) > [快速查看 NPM、yarn 全局安装过的包 | Laravel China 社区](https://learnku.com/articles/16798/quick-view-of-npm-and-yarn-global-installed-packages)

```
$ npm list -g --depth=0
```

![file](https://i.imgur.com/QsNOG27.png)

```
$ yarn global list --depth=0
```

![file](https://i.imgur.com/3NJPlVK.png)
