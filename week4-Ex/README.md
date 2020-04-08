# Setup and Teardown

Jest 提供了輔助函式讓我們在每一個測試進行前、進行後進行一些額外的處理。

## Repeating Setup For Many Tests

當測試條件是**在每一個測試函式執行前或執行後需要有額外的設置時**，我們可以透過 `beforeEach` 、 `afterEach` 達成。

## One-Time Setup

當測試條件是**只需要在測試檔案中設置一次的情況**，我們可以透過 `beforeAll` 、 `afterAll` 達成。

## Scope

透過 `describe` 可以將相關聯的測試整理一起進行測試。

且對於輔助函式而言，是否位於 `describe` 中執行的順序也會有差別。

## Order of execution of describe and test blocks

jest 在執行測試時，會先將所有 `describe` 的函式先行處理後，才會進行測試。

## General Advice

- 建議一:

如果有任何一個測試無法通過時，使用 `test.only` 來進行檢查。

`test.only` 可以用來在執行測試檔案時，**只執行被設定為 only 的測試，其餘則會顯示 skip 的提示訊息。**

```javasript= 
// exercise.test.js
test.only('Test fn: sum2', () => {
  // Arrange
  let a = 1, b = 2;
  // Act
  let getValue = testFn.sum2(a, b);
  // Assert
  expect(getValue).toBe(3);
});
```

疑問: 如果是 input / output 不同的話，可以從 expect / receive 得到結果，那麼 `test.only` 使用的時機?

- 建議二

如果測試單獨運行時不會有問題，但作為套件一部分來執行時則會報錯，那麼最有可能的情況是其他測試干擾的這個測試。

可以透過 `beforeEach` 在每一個測試函式進行前清除前一個測試的狀態。