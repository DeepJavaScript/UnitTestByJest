it('custom matcher', () => {
  const mockFunc = jest.fn((x, y) => x + y)
    .mockName('mockFunc');

  mockFunc(1, 2);
  mockFunc();
  mockFunc(3, 4);
  
  // mock 函數被呼叫的次數
  expect(mockFunc).toBeCalledTimes(3);
  expect(mockFunc.mock.calls.length).toBe(3);

  // mock 函數至少被呼叫一次
  expect(mockFunc).toBeCalled();
  expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

  // 至少一次呼叫 mock 函數所指定的 args
  expect(mockFunc).toBeCalledWith(1, 2);
  expect(mockFunc).toBeCalledWith(3, 4);
  expect(mockFunc.mock.calls).toContainEqual([1, 2]);
  expect(mockFunc.mock.calls).toContainEqual([3, 4]);

  // 最後一次呼叫 mock 函數所指定的 args
  expect(mockFunc).lastCalledWith(3, 4);
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([3, 4]);

  // 最後一次呼叫 mock 函數的第一個 arg 是 `3` (此 assert 沒有語法糖)
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(3);

  // snapshot 會檢查 mock 是否以相同的順序、相同的 arg 被呼叫相同的次數
  expect(mockFunc.mock.calls).toEqual([[1, 2], [], [3, 4]]);

  // assert mock 函數的名稱
  expect(mockFunc.getMockName()).toBe('mockFunc');
});