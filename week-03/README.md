Week 03: Testing Asynchronous Code
===

當有非同步處理時，Jest 需要知道它所測試的程式碼何時完成，然後才能繼續進行其他測試。

## Callbacks

最常見的非同步 pattern 就是 callback。

例如：`fetchData(callback)` 函數取得資料，並在完成後呼叫 `callback(data)`。測試回傳的資料是否為 `"hi"`。

預設情況下，Jest 測試一旦執行到結尾就會完成，所以此測試不會按預期運作。因為 `fetchData` 一旦完成，測試就會在 callback 呼叫之前完成：

```javascript
// src/fetchData.js
function fetchData(callback, type) {
  console.log(`--- fetchData: ${type} Start ---`);
  setTimeout(() => {
    callback('hi');
  }, 3000);
  console.log(`--- fetchData: ${type} End ---`);
}

export default fetchData;
```

```javascript
// __tests__/async.test.js
import fetchData from '../src/async';

test('同步執行 callback 回傳 hi', () => {
  function callback(data) {
    console.log(`---callback Start---`);
    expect(data).toBe('hi');
    console.log(`---callback End---`);
  }

  fetchData(callback, 'sync');
});
```

所以建議 `test` 函數不要用 empty argument，而是用名為 `done` 的 argument。Jest 會等到 `done` callback 被呼叫時才會結束測試：

```javascript
// __tests__/async.test.js
import fetchData from '../src/async';

test('非同步執行 callback 回傳 hi', done => {
  function callback(data) {
    try {
      console.log(`---callback Start---`);
      expect(data).toBe('hi');
      console.log(`---callback End---`);
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback, 'async');
});
```

如果沒有呼叫 `done()`，測試就會失敗 (帶有 timeout error)：

```shell
 FAIL  week-03/__tests__/async.test.js (5.863s)
  callback
    ✕ 非同步執行 callback 回傳 hi (5009ms)

  ● callback › 非同步執行 callback 回傳 hi

    : Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Error:

      12 |   });
      13 |   
    > 14 |   test('非同步執行 callback 回傳 hi', done => {
         |   ^
      15 |     function callback(data) {
      16 |       try {
      17 |         console.log(`---callback: async Start---`);

      at new Spec (node_modules/jest-jasmine2/build/jasmine/Spec.js:116:22)
      at Suite.describe (week-03/__tests__/async.test.js:14:3)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
Time:        6.205s
```

如果 `expect` 陳述句失敗，就會拋出錯誤，且不呼叫 `done()`。若想在測試 log 看到失敗的原因，就需在 `try` 區塊中包裝 `expect`，並在 `catch` 區塊中傳遞錯誤。否則最後會得到不透明的 timeout 錯誤，不會顯示 `expect(data)` 接收到的值。

## Promise

如果測試回傳一個 promise，Jest 會等待這個 promise 的 resolve。如果 promise 被 reject，測試會自動失敗。

一定要回傳 promise：如果省略了 `return` 陳述句，測試會在 `promiseFetchData` 回傳的 promise 被 resolve，並且 `then()` 有機會執行 callback 之前完成。

例如：下面範例的測試不會等到 promise 內的 `setTimeout()` 跑完就會立即完成測試：

```javascript
// src/fetchData.js
function promiseFetchData(option) {
  return new Promise((resolve, reject) => {
    console.log(`--- Promise: Start ---`);
    setTimeout(() => {
      if (option.flag === 'success') resolve('hi');
      if (option.flag === 'fail') reject('error');
    }, 3000);
    console.log(`--- Promise: End ---`);
  });
}
```

```javascript
// __tests__/async.test.js
import promiseFetchData from '../src/fetchData';

test('回傳的 promise resolve 資料為 hi', () => {
  return promiseFetchData({ flag: 'success' }).then(data => {
    console.log(`--- then: Start ---`);
    expect(data).toBe('hi');
    console.log(`--- then: End ---`);
  });
});
```

所以如果省略了 `return` 陳述句，下面範例的 `'hi XD'` 雖然跟 `data` 真正拿到的值不同，但測試還是會通過：

```javascript
// __tests__/async.test.js
import promiseFetchData from '../src/fetchData';

test('回傳的 promise resolve 資料為 hi', () => {
  promiseFetchData({ flag: 'success' }).then(data => {
    console.log(`--- then: Start ---`);
    expect(data).toBe('hi');
    console.log(`--- then: End ---`);
  });
});
```

若想讓 promise 被 reject，可用 `.catch` 方法。記得要加上 `expect.assertions` 來驗證是否呼叫一定數量的 assertions。否則一個 fulfilled promise 不會讓錯誤失敗：

```javascript
// __tests__/async.test.js
import promiseFetchData from '../src/fetchData';

test('promise reject 的錯誤訊息為 error', () => {
  expect.assertions(1);
  return promiseFetchData({ flag: 'fail' })
    .catch(e => {
      console.log(`--- catch: Start ---`);
      expect(e).toMatch('error');
      console.log(`--- catch: End ---`);
    });
});
```

## `.resolves` / `.rejects`

也可在 `expect` 陳述句中使用 `.resolves` matcher，Jest 會等待 promise 的 resolve。如果 promise 被 reject，測試會自動失敗。

```javascript
// __tests__/async.test.js
import promiseFetchData from '../src/fetchData';

test('使用 resolves matcher', () => {
  return expect(promiseFetchData({ flag: 'success' })).resolves.toBe('hi');
});
```

一定要回傳 assertion：如果省略了 `return` 陳述句，測試會在 `promiseFetchData` 回傳的 promise 被 resolve，並且 `then()` 有機會執行 callback 之前完成。

若想讓 promise 被 reject，可用 `.rejects` matcher。如果 promise 是 fulfilled，測試就會自動失敗：

```javascript
// __tests__/async.test.js
import promiseFetchData from '../src/fetchData';

test('使用 rejects matcher', () => {
  return expect(promiseFetchData({ flag: 'fail' })).rejects.toMatch('error');
});
```

## Async/Await

也可用 `async` 和 `await`。在傳給測試函數前加上 `async` 關鍵字：

```javascript
// __tests__/async.test.js
import promiseFetchData from '../src/fetchData';

test('使用 await resolves', async () => {
  const data = await promiseFetchData({ flag: 'success' });
  expect(data).toBe('hi');
});

test('使用 await rejects', async () => {
  expect.assertions(1);
  try {
    await promiseFetchData({ flag: 'fail' });
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

也可將 `async` 和 `await` 與 `.resolves` 和 `.rejects` matcher 結合使用：

```javascript
// __tests__/async.test.js
import promiseFetchData from '../src/fetchData';

test('使用 await 和 resolves matcher', async () => {
  await expect(promiseFetchData({ flag: 'success' })).resolves.toBe('hi');
});

test('使用 await 和 rejects matcher', async () => {
  await expect(promiseFetchData({ flag: 'fail' })).rejects.toMatch('error');
});
```
