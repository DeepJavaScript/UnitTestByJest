# Testing Asynchronous Code


## Callbacks


- 安捏姆湯，因為在呼叫 callback 之前，Jest 在 fetchData 執行結束後完成。

```js
const fetchData = (callBack, type) => {
  console.log(`--- fetchData: ${type} Start ---`)
  setTimeout(() => {
    callBack('peanut butter')
  }, 3000)
  console.log(`--- fetchData: ${type} End ---`)
}

test(`callback: it's a sync function`, () => {

  function callback(data) {
    console.log(`---callback Start---`);
    expect(data).toBe('peanut butter');
    console.log(`---callback End---`);

  }
  fetchData(callback, 'sync');
});

```
上面這段程式碼不管怎麼寫都會 pass。


- !! 建議這樣做 !!
```js
test(`callback: it's a async function`, done => {
  function callback(data) {
    console.log(`---callback TryCatch Start---`);
    try {
      expect(data).toBe('peanut butter');
      done();
      console.log(`---callback: try End---`);
    } catch (error) {
      done(error);
      console.log(`---callback: catch End---`);
    }
  }

  fetchData(callback, 'async');
});
```
上面這段程式碼可以驗證是不是真的 pass。

## Promises

```js
const promise = (type, flag) => {
  console.log(`--- Promise ${type}: Start ---`)
  const promiseObj = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag) resolve('peanut butter');
      if (!flag) reject('error');
    }, 3000);
  });
  return promiseObj
}
```

```js
test('Promise Try', () => {
  return promise('Try', true).then(data => {
    expect(data).toBe('peanut butter');
    console.log(`--- Promise Try: End ---`)
  });
});

test('Promise Catch', () => {
  expect.assertions(1);
  return promise('Catch', false).catch(error => {
    expect(error).toBe('error');
    console.log(`--- Promise Catch: End ---`)
  });
});
```

使用 Promise 的話，直接在 Promise 中的 handler 中寫 Matchers 語句。

```js
test('Promise with Resolves', () => {
  return expect(promise('Catch', true)).resolves.toBe('peanut butter')
});

test('Promise with Reject', () => {
  expect.assertions(1);
  return expect(promise('Catch', false)).rejects.toBe('error')
});
```

或可以使用 `resolves` 及 `rejects`。

## Async/Await

另外也能使用 `Async/Await`。

```js
test('Async/Await', async () => {
  let res = await promise('Async/Await', true);
  console.log(res);

  expect(res).toBe('peanut butter');
});

test('Async/Await with try catch', async () => {
  expect.assertions(1);
  try {
    await promise('Async/Await with try catch', false);
  } catch (e) {
    expect(e).toBe('error');
  }
});
```

並同時搭配 `resolves/rejects`。

```js
test('Async/Await with resolves', async () => {
  await expect(promise('Async/Await with resolves', true)).resolves.toBe('peanut butter')
});
test('Async/Await with rejects', async () => {
  expect.assertions(1);
  await expect(promise('Async/Await with rejects', false)).rejects.toBe('error')
});
```


Matchers Note:
- `expect.assertions(number)` :
- `done` :
- `resolves` :
- `rejects` :