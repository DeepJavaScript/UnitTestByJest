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

