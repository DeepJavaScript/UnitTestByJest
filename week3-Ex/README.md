# Testing Asynchronous Code

測試非同步函式。

## Callbacks

在下列情況， `fetchData` 會在 `callback` 被呼叫前就完成，因而完成測試。

```javascript=
// src.js
const fetchData = callback => {
  setTimeout(() => {
    callback('data');
  }, 3000);
}

function callback(data) {
  // dosomething here...
  // console.log('data');
}

fetchData(callback);
```

```javascript=
// test.js
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

所以需要透過 `done` 用來讓 Jest 能夠等到 `callback` 被執行完成後才能完成測試。

但**如果 `done` 一直沒有被使用的話，測試則會失敗。**

```javascript=
// test.js
test('Test fn: asyncFunc',  done => {
  // Arrange
  function callback(data) {
    // Assert
    expect(data).toBe('data');
    done();
  }
  // Act
  fn.fetchData(callback);
});
```

## Promise

對於回傳若為 `Promise` 的物件也同樣可以進行測試，如果:

1. `Promise` 為 `resolve`，則測試會等待其 `reslove` 後的值後完成測試。
2. `Promise` 為 `reject`，則測試會失敗。

下列程式碼說明在測試中如果沒有回傳 promise 的話，則會導致**測試會比 promise 物件解析來得早完成。**

```javascript=
// src.js
const promiseObj = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Time\'s up!');
    },2000)
  })
}
```

```javascript=
// test.js
// It will get test string first and promise string second.
test('Test Promise', done => {
  // Act
  fn.promiseObj()
    .then(data => {
      console.log('promise');
      //Assert
      expect(data).toBe('Time\'s up!');
      done();
    });
  console.log('test');
})
```

所以需要寫成如下方測試：
```javascript=
// test.js
test('Test Promise', done => {
  // Act
  return fn.promiseObj()
    .then(data => {
      //Assert
      expect(data).toBe('Time\'s up!');
      done();
    });
})
```

### 透過 `resolves` /`rejects` 改寫上方程式碼

```javascript=
// src.js
const promiseObj = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Time\'s up!');
    },2000)
  })
}
```

```javascript=
// test.js
test('Test Promise', () => {
  // Arrange
  let promise;
  // Act
  promise = fn.promiseObj();
  //Assert
  return expect(promise).resolves.toBe('Time\'s up!');
})
```

## 使用 async/await 搭配 `resolves` /`rejects`

```javascript=
// test.js
test('Test Promise: use async, await', async () => {
    // Arrange
    let promise;
    // Act
    promise = fn.promiseObj(); // get promise object.
    
    //Assert
    await expect(promise).resolves.toBe('Time\'s up!');
  });