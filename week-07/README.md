Week 07：Snapshot Testing
===

當您希望確保 UI 不會意外修改時，snapshot 測試是一個非常有用的工具。

行動應用的典型 snapshot 測試案例呈現 UI 元件、獲得 snapshot，然後與儲存在測試中的參考 snapshot 檔案進行比較。

若兩個 snapshot 不 match，test 就會失敗，可能的原因：
- 意外的變更
- reference snapshot 需要更新到 UI 元件的新版本

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

若要指定哪個測試需要重新產生 snapshot，可加上 `--testNamePattern=<regex>` option：

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
    ✓ render the link element of the Titangene Blog home page (14ms)
                                                      › 1 snapshot written.
Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 written, 1 total
Time:        0.885s, estimated 1s
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

## Property Matchers

有時 snapshot 的物件中會有一些 field 生成 (例如：ID 和 Date)，若對這些物件進行 snapshot，就會在執行時常常發生 snapshot 失敗。

```javascript
// __tests__/propertyMatchers.test.js
describe('Property Matchers', () => {
  it('will fail every time', () => {
    const user = {
      name: 'Titan',
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20)
    };

    console.log(user);
  
    expect(user).toMatchSnapshot();
  });
});
```

像上面的測試執行第二次時，snapshot 就會失敗：

![](./images/2020-04-30-17-33-44.png)

所以 Jest 允許你對任何 property 提供 asymmetric matcher。Jest 會在寫入 snapshot 或測試 snapshot 之前，檢查 matcher，然後將 snapshot 儲存至 snapshot 檔案中，而不是 received value：

```javascript
// __tests__/propertyMatchers.test.js
describe('Property Matchers', () => {
  it('will check the matchers and pass', () => {
    const user = {
      name: 'Titan',
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20)
    };

    console.log(user);
  
    expect(user).toMatchSnapshot({
      createdAt: expect.any(Date),
      id: expect.any(Number),
    });
  });
});
```

下面是 snapshot 儲存的內容：

```javascript
// __tests__/__snapshots__/propertyMatchers.test.js.snap
exports[`Property Matchers will check the matchers and pass 1`] = `
Object {
  "createdAt": Any<Date>,
  "id": Any<Number>,
  "name": "Titan",
}
`;
```

也可以直接指定要被精確檢查並儲存至 snapshot 的值 (才不會受到錯誤值影響，讓 snapshot 儲存到錯誤的值)：

```javascript
// __tests__/propertyMatchers.test.js
describe('Property Matchers', () => {
  it('will check the values and pass', () => {
    const user = {
      name: 'Titan',
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20)
    };

    console.log(user);
  
    expect(user).toMatchSnapshot({
      name: 'Titan',
      createdAt: expect.any(Date),
      id: expect.any(Number),
    });
  });
});
```

下面是 snapshot 儲存的內容：

```javascript
// __tests__/__snapshots__/propertyMatchers.test.js.snap
exports[`Property Matchers will check the values and pass 1`] = `
Object {
  "createdAt": Any<Date>,
  "id": Any<Number>,
  "name": "Titan",
}
`;
```