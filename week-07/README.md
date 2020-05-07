Week 07：Snapshot Testing
===

當您希望確保 UI 不會意外修改時，snapshot 測試是一個非常有用的工具。

行動應用的典型 snapshot 測試案例呈現 UI 元件、獲得 snapshot，然後與儲存在測試中的參考 snapshot 檔案進行比較。

若兩個 snapshot 不 match，test 就會失敗，可能的原因：
- 意外的變更
- reference snapshot 需要更新到 UI 元件的新版本

為何要用 snapshot testing？
- 不用擔心：測試是在指令列執行，不用真的在瀏覽器執行，所以不用等待建構、開啟瀏覽器、載入頁面和驅動 UI 使元件進入預期狀態，這樣狀態會不穩定，並且測試結果會變得很雜
- 快速迭代：快速得到結果
- debugging：不用重新建立 screenshot test scenario 並 debug 視覺化差異中發生的事

不是每個測試都適合用 snapshot testing：
- 期望 (expected) 較穩定的定義，有明確的行為：一般的測試適合 assertion-based 的測試
- 常變更的定義，不明確的行為：適合用 snapshot testing
  - 例如：UI testing，因為常會做一些瑣碎的變更，例如：新增空白、更改 class，或是 HTML 結構會隨著時間推移改很大

## 使用 Jest 進行 snapshot 測試

```javascript
// src/linkElement.js
function rendererLinkElement(url, linkName) {
  return `<a href="${url}">${linkName}</a>`;
}

export default rendererLinkElement;

// __tests__/externalSnapshots.test.js
describe('external snapshots', () => {
  it('render the link element of the Titangene Blog home page', () => {
    let url = 'https://titangene.github.io/';
    let linkName = 'Titangene Blog';
  
    let actual = rendererLinkElement(url, linkName);
  
    expect(actual).toMatchSnapshot();
  });
});
```

執行測試：

```shell
$ npx jest ./week-07/__tests__/externalSnapshots.test.js 
 PASS  week-07/__tests__/externalSnapshots.test.js
  external snapshots
    ✓ render the link element of the Titangene Blog home page (3ms)

 › 1 snapshot written.
Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 written, 1 total
Time:        0.657s, estimated 1s
Ran all test suites matching /.\/week-07\/__tests__\/externalSnapshots.test.js/i.
```

第一次執行此測試時，Jest 會在 `__tests__` 目錄內建立 `__snapshots__` 目錄，裡面建立一個 snapshot 檔案，檔名會是測試檔的名稱再加上 `.snap` (例如：`externalSnapshots.test.js.snap` )，內容如下：

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`renders correctly 1`] = `"<a href=\\"https://titangene.github.io/\\">Titangene Blog</a>"`;
```

snapshot 應與修改的程式碼一起 commit，並在 code review 中進行 review。Jest 使用 [`pretty-format`](https://github.com/facebook/jest/tree/master/packages/pretty-format) 讓 snapshot 在 code review 過程具有可讀性。

之後再次執行測試就會將 render 的輸出與之前的 snapshot 進行比較：
- 若 match，測試就會 pass
- 若不 match，可能是你的程式碼有 bug，或是實作發生變化，需要更新 snapshot

```shell
$ npx jest ./week-07/__tests__/linkElement.test.js
 PASS  week-07/__tests__/linkElement.test.js
  ✓ renders correctly (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 passed, 1 total
Time:        0.777s, estimated 2s
Ran all test suites matching /.\/week-07\/__tests__\/linkElement.test.js/i.
```

## 更新 snapshot

假設修改測試：

```diff
it('renders correctly', () => {
-  let url = 'https://titangene.github.io/';
-  let linkName = 'Titangene Blog';
+  let url = 'https://www.google.com/';
+  let linkName = 'Google';

  let actual = rendererLinkElement(url, linkName);

  expect(actual).toMatchSnapshot();
});
```

再次執行測試就會失敗，因為之前 snapshot 儲存的跟現在修改的不 match：

![](./images/2020-04-30-18-12-49.png)

使用 `--updateSnapshot` (或 `-u` ) option 就能為失敗的測試重新建立新的 snapshot (通過的測試不會重新建立)：

```shell
$ jest --updateSnapshot
```

```shell
$ npx jest ./week-07/__tests__/linkElement.test.js -u
 PASS  week-07/__tests__/linkElement.test.js
  ✓ renders correctly (4ms)

 › 1 snapshot updated.
Snapshot Summary
 › 1 snapshot updated from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 updated, 1 total
Time:        0.794s, estimated 1s
Ran all test suites matching /.\/week-07\/__tests__\/linkElement.test.js/i.
```

本來 `--testNamePattern=<regex>` option 是用來過濾只執行指定的測試，加上 `-u` option 後，就能指定哪些測試需要重新產生 snapshot：

```javascript
$ jest -u --testNamePattern=<regex>
```

其他連結：
- [Jest 14.0: React Tree Snapshot Testing · Jest](https://jestjs.io/blog/2016/07/27/jest-14.html)
- [Testing with Jest Snapshots: First Impressions | benmccormick.org](https://benmccormick.org/2016/09/19/testing-with-jest-snapshots-first-impressions/)
- [Use Jest's Snapshot Testing Feature from @kentcdodds on @eggheadio](https://egghead.io/lessons/javascript-use-jest-s-snapshot-testing-feature?pl=testing-javascript-with-jest-a36c4074)

## 互動式 snapshot 模式

在 watch 模式下，按 `i` 鍵進入互動式 snapshot 模式 (只有在有 failed snapshot 時，才會看到 `i` 這個選項)：

![](./images/2020-04-30-12-38-27.png)

此互動式 snapshot 模式是用 failed snapshot 和 failed output，此模式會各別看每個 snapshot，有以下功能：
- `u` (update)：更新失敗的 snapshot
- `s` (skip)：跳過當前測試 (跳至下一個測試)
- `q` (quit)：離開互動式 snapshot 模式
- `Enter`：觸發測試執行 (重跑單前測試)

只要還有一個 failed snapshot 未更新，就能按 `r` 鍵重新回到互動式 snapshot 模式：

![](./images/2020-04-30-12-51-36.png)

更新所有 failed snapshot 後，就可按 `Enter` 回到 watch 模式：

![](./images/2020-04-30-13-03-09.png)

> 可是奇怪的是，原本我執行 Jest 時有指定某個目錄內的測試，當我從互動式 snapshot 模式回到 watch 模式時，竟然之前的指令就失效，所以還會多測其他目錄內的測試 (目前猜測是未被 Git 追蹤的測試檔都會被執行)。

## Inline Snapshots

inline snapshot 和 external snapshot ( `.snap` 檔案) 的行為相同，但 inline snapshot 會把 snapshot value 自動寫回原始碼中。不用切換至外部檔案來確保寫入正確的值。

:::warning
inline snapshot 是由 [Prettier](https://prettier.io/) 提供支援，所以必須安裝 Prettier 才能用 inline snapshot。寫測試檔時，請遵守你的 Prettier 配置。

若你在 Jest 找不到的地方安裝 Prettier，則可用 [`prettierPath`](https://jestjs.io/docs/en/configuration#prettierpath-string) 配置屬性來告訴 Jest。

如果未安裝 Prettier 就使用 `toMatchInlineSnapshot()`，會輸出以下錯誤訊息：

```shell
 FAIL  week-07/__tests__/inlineSnapshots.test.js
  ● Test suite failed to run

    Cannot find module 'prettier' from 'setup_jest_globals.js'

      at Resolver.resolveModule (node_modules/jest-resolve/build/index.js:296:11)
```
:::

安裝 Prettier：

```shell
$ yarn add prettier --dev --exact
```

一開始寫測試時，不帶 argument 呼叫 `toMatchInlineSnapshot()`：

```javascript
// __tests__/inlineSnapshots.test.js
import rendererLinkElement from "../src/linkElement";

describe("inline snapshots", () => {
  it("render the link element of the Titangene Blog home page", () => {
    let url = "https://titangene.github.io/";
    let linkName = "Titangene Blog";

    let actual = rendererLinkElement(url, linkName);

    expect(actual).toMatchInlineSnapshot();
  });
});
```

執行測試時，Jest 會對 `tree` 進行評估，且 snapshot 會寫入 `toMatchInlineSnapshot()` 的 argument：

```shell
$ npx jest ./week-07/__tests__/inlineSnapshots.test.js
 PASS  week-07/__tests__/inlineSnapshots.test.js
  inline snapshots
    ✓ render the link element of the Titangene Blog home page (12ms)

 › 1 snapshot written.
Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 written, 1 total
Time:        0.909s, estimated 1s
Ran all test suites matching /.\/week-07\/__tests__\/inlineSnapshots.test.js/i.
```

```javascript
describe("inline snapshots", () => {
  it("render the link element of the Titangene Blog home page", () => {
    let url = "https://titangene.github.io/";
    let linkName = "Titangene Blog";

    let actual = rendererLinkElement(url, linkName);

    expect(actual).toMatchInlineSnapshot(
      `"<a href=\\"https://titangene.github.io/\\">Titangene Blog</a>"`
    );
  });
});
```

也可在指令使用 `--updateSnapshot` (或 `-u` ) option 或在 `--watch` 模式下按 `u` 鍵來更新 snapshot。

:::info
inline snapshot 看似比 external snapshot 還方便，能讓測試更易讀，但是，若 snapshot 值很長 (例如：較大的 component 所 render 出來的 HTML)，反而會讓測試很亂，這時反而用 external snapshot 會更適合，所以請慎用。
:::
