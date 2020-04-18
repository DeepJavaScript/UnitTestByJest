# Testing Asynchronous Code

上週，我們看了各式各樣的基本的斷言庫，可以讓我們測試簡單型別(Number/String/Boolean)，測試非零值(undefined/null)，測試複雜型別(Object/Array)，甚至還可以測試是否例外的發生行為，以及測試例外錯誤(Error)

這一週，來看看 JavaScript 的宿命對決，要怎麼測試非同步問題。
這個就沒什麼測試觀念要帶入~~，就純粹的在看是不是會寫 JavaScript 而已~~。
對非同步沒有經驗或不懂的朋友，可以先看看影片: [所以說event loop到底是什麼玩意兒？| Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ) 了解一下再繼續看哦

依照[非同步的聖經](https://medium.com/@peterchang_82818/javascript-es7-async-await-%E6%95%99%E5%AD%B8-703473854f29-tutorial-example-703473854f29)的步調，來看非同步的三位一體吧！

## Callbacks

:::danger
測試千萬不要這樣寫
:::

```javascript
// Don't do this!
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback); // 執行 (最後一行) 就...結束了。
});
```

這樣寫的話， `fetchData` 因為在最後一行，所以只要它跑完就結束了。JavaScript 是非同步語言，所以這種發送 API 的事都是主執行緒結束時在處理的，但是主執行緒結束，Jest 也就結束了，沒有跑 callback 等同於沒有跑測試 QQ

怎辦？ Jest 給了我們一個 `done` 的用法 (在此為了不要和上一個例子差太多，所以我改寫了 jest 官網上的範例)

```javascript
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});
```

只要你有引入 done 就一定要執行 done 不然就會失敗。
算是很好的保障機制。 `done()` 的時間點會安排在測試的最後。
如果有 try-catch 我建議放在 `finally` 的區段。

## Promises

想要弄懂 Prmose 可以先看看這一篇: [JavaScript Promise：簡介  |  Web  |  Google Developers](https://developers.google.com/web/fundamentals/primers/promises?hl=zh-tw)

:::danger
如果你使用 Promise 而 Promise 回傳 reject 的話，就會導致測試失敗。
:::

:::danger
注意: 使用 promise 可以不用 done，但是要記得在該 return 時加上 return。
`expect` 寫在 `.then` 或 `.catch` 裡的 callback 時， `fetchData` 前要加 `return`。
:::

```javascript
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

** 可靠的 `Promise.reject()`**

如果你想測試 `Promise.reject()` 可靠的執行。除了使用 `.catch` 註冊一個會執行 `expect` 的 callback 之外。最好再加一個 `expect.assertions(1);` 讓 Jest 知道你應該要執行一次 assertion。
確保它真的會跑到 assertion 而不是就這樣默默的都執行對了。不會 reject 然後又沒報錯。

```javascript
test('the fetch fails with an error', () => {
  expect.assertions(1); // 讓 Jest 知道你應該要執行一次 assertion。
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

### .resolves / .rejects

Jest 斷言庫提供了 promise 的簡便寫法，這時就是 Effective Jest 的時刻了。

:::danger
注意: 使用 promise 可以不用 done，但是要使用 `.resolves` / `.rejects`。
使用 `.rejects` 時，可以不用 `expect.assertions(1);`。
無論使用哪一種，最後要記得，在該 return 時加上 return。
:::

** 可靠的 `Promise.resolve()`**

```javascript
test('the data is peanut butter(shorthand)', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```

** 可靠的 `Promise.reject()`**

```javascript
test('the fetch fails with an error(shorthand)', () => {
  return expect(fetchDataErr()).rejects.toMatch('error');
});
```

## Async/Await

使用 async/await 第一件事，就是要會用 async/await

1. 記得在要執行 await 的函數開頭，加上 async。
2. 用 try-catch 捕捉 reject 的結果。 (取代 `.catch` 的語法)

```javascript
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchDataErr();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

Jest 斷言庫提供了 async/await 的簡便寫法，這時就是 Effective Jest 的時刻了。

在 .resolves / .rejects 的同法，也可以搭配 async/await

```javascript
test('the data is peanut butter(shorthand)', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error(shorthand)', async () => {
  // await expect(fetchDataErr()).rejects.toThrow('error'); // 我這個執行失敗
  await expect(fetchDataErr()).rejects.toMatch('error'); // 這個執行成功
});
```

# 問題

最後一個例子，不知道為什麼照官網寫的不能成功。