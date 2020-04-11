import * as testFn from '../js/jestFn'


describe('Test exercise fn', () => {
  test('Fn: forEach', () => {
    // 測試需求: 測試 forEach 函式是否可以正常執行 for 迴圈。
    // 基於這個目的，callback 就是一個可能影響執行的函式，所以需要隔絕掉。
    
    // Arrange
    const mockCallback = jest.fn(x => x + 42);
    const items = [0, 1];

    // Act
    testFn.forEach(items, mockCallback);
    // console.log(mockCallback.mock);

    // Assert
      // The mock function is called twice.
    const calls = mockCallback.mock.calls.length;
    expect(calls).toBe(2);

      // The first argument of the second call to the functin was 1
    const second = mockCallback.mock.calls[1][0];
    expect(second).toBe(1);

      // The return value of the first call to the function was 42.
    const firstValue = mockCallback.mock.results[0].value;
    expect(firstValue).toBe(42);

  });
})