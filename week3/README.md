# Testing Asynchronous Code
- 默認情況下，Jest 測試執行完程式碼就會結束，不會等待異步。

```javascript
// async.js
function fetchDataNotPromise(callbackFunction) {
  console.log("start")
  setTimeout(function() {
    callbackFunction('peanut butter');
  }, 1000);
  console.log("end")
}
```

```javascript
test('the data is peanut butter', () => {
  function callback(data) {
    console.log("callback") // callback 的部分還沒 run，就結束了
    expect(data).toBe('peanut');
  }

  fetchDataNotPromise(callback);
});
```

- 執行、使用 done 參數，告知 jest 測試完成

```javascript
test('the data is peanut butter', (done) => {
      function callback(data) {
        console.log("callback")
        expect(data).toBe('peanut');
        done()
      }
    
      fetchDataNotPromise(callback);
    });
```

但是有可能會發生一些錯誤導致  done 一直未被執行，例如：

```javascript
test('the data is peanut butter', (done) => {
  function callback(data) {
    console.log("callback")
    throw Error()
    expect(data).toBe('peanut butter');
    done()
  }

  fetchDataNotPromise(callback)
});
```

就應該要使用 try catch 包裹錯誤，避免環境 crash
```javascript
test('the data is peanut butter', (done) => {
  function callback(data) {
    console.log("callback")
    try{
      throw Error()
      expect(data).toBe('peanut butter');
      done()
    } catch (e) {
      done(e);
    }
  }

  fetchDataNotPromise(callback)
});
```

## Promises

- 如果程式碼有返回 promise，則使用 return 進行測試。

```javascript
// async.js
function fetchDataReturnPromise() {
  console.log("start")
  const promiseTest = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('peanut butter');
      // reject('something error');
    }, 1000);
  });
  return promiseTest
}
```
```javascript
test('test fetchDataReturnPromise', () => {
  return fetchData.fetchDataReturnPromise().then(res=>{
  expect(res).toBe('peanut butter');
  })
});
```

- 如果想要驗證 catch 中的資訊，建議添加 expect.assertions 表明驗證數量

```javascript
function fetchDataReturnPromise() {
  console.log("start")
  const promiseTest = new Promise(function(resolve, reject) {
    setTimeout(function() {
      // resolve('peanut butter');
      reject('something error');
    }, 1000);
  });
  return promiseTest
}
```

```javascript
test.skip('test fetchDataReturnPromise error', () => {
  expect.assertions(1);
  return fetchData.fetchDataReturnPromise()
    .catch(e => {
      expect(e).toBe('something error')
    })
});
```

### .resolves / .rejects

- 亦可以使用 matchers 來測試 promise

```javascript
// 例如 resolves
test('test fetchDataReturnPromise with matchers', () => {
  return expect(fetchData.fetchDataReturnPromise()).resolves.toBe('peanut butter')
});    

// 例如 rejects
test('test fetchDataReturnPromise error with matchers', () => {
  expect.assertions(1);
  return expect(fetchData.fetchDataReturnPromise()).rejects.toBe('something error')
});
```

### Async/Await

- 不需要 return
- 一樣可以使用上述 try catch 的寫法或是 matchers 的寫法

```javascript
//  try catch 寫法
test('test fetchDataReturnPromise with async/await', async () => {
  let res = await fetchData.fetchDataReturnPromise();
  expect(res).toBe('some data');
});

test('test fetchDataReturnPromise with async/await', async () => {
  expect.assertions(1);
  try {
    await fetchData.fetchDataReturnPromise();
  } catch (e) {
    expect(e).toBe('something error');
  }
});


// matchers 寫法

test('test fetchDataReturnPromise with matchers and async/await', async() => {
  await expect(fetchData.fetchDataReturnPromise()).resolves.toBe('some data')
});
test('test fetchDataReturnPromise error with matchers and async/await', async() => {
  expect.assertions(1);
  await expect(fetchData.fetchDataReturnPromise()).rejects.toBe('something error')
});
```