```javascript=
// async.js
export { fetchData }

fetchData(callback);
function fetchData(callback) {
  setTimeout(callback, 3000, 'peanut butter');
}

function callback(data) {
  return data;
}
```
```javascript=
// test.js
it('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }
  async.fetchData(callback);
});

```

**此時產生問題在於 fetchData 執行已完成，但此測試卻沒有調用回呼函數即結束。**

**npm run test 運行時，產生以下提示：**
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.

- Cannot log after tests are done. Did you forget to wait for something async in your test?
**Attempted to log "peanut butter".**

---

### Callbacks：

避免將測試函式中不帶任何參數，改為替代方案帶有一個參數值(call back)。Jest 將等待直到完成的回調函式被調用 done()，才完成整個測試。

如果沒有調用 done()，則測試將失敗(帶有超時錯誤提示)

```javascript=
// test.js
it('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (e) {
      done(e); // 此情況是如何使用？ 
    }
  }
  async.fetchData(callback);
});
```

---

### Promises：

透過假設 fetchData 不使用回調，而是直接返回一個解析為字符串 'peanut butter' 的 promise，可以進行測試：

```javascript=
// async.js
function jestPromises() {
  const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('peanut butter');
      reject('Error');
    }, 3000);
  });
  return fetchData;
}
```
```javascript=
// test.js
it('the fetch fails with an error', () => {
  expect.assertions(1);
  return async.jestPromises()
  // .then(res => expect(data).toBe('peanut butter'))
  .catch(e => expect(e).toMatch('Error'));
});
```

直接使用 return 語句而不採用回調，避免執行回調報錯。

---

### .resolves / .rejects:

可以直接使用在 expect 語句中透過 matchers 解析，Jest 將等待該 Promise 執行。

```javascript=
// test.js
it('the data is peanut butter', () => {
  return expect(async.jestPromises()).resolves.toBe('peanut butter');
});

it('the fetch fails with an error', () => {
  return expect(async.jestPromises()).rejects.toMatch('Error');
});
```

---

### Async/Await:

```javascript=
// test.js
it('the data is peanut butter', async () => {
  const data = await async.jestPromises();
  expect(data).toBe('peanut butter');
});

it('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await async.jestPromises();
  } catch (e) {
    expect(e).toMatch('Error');
  }
});
```
```javascript=
it('the data is peanut butter', async () => {
  await expect(async.jestPromises()).resolves.toBe('peanut butter');
});

it('the fetch fails with an error', async () => {
  await expect(async.jestPromises()).rejects.toBe('Error');
});
```