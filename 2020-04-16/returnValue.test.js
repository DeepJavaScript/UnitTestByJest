test('return Value of mock function', () => {
  const myMock = jest.fn();
  
  // console.log(myMock());
  // > undefined
  expect(myMock()).toBeUndefined();

  myMock
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    .mockReturnValue(true);

  // console.log(myMock(), myMock(), myMock(), myMock());
  // > 10, 'x', true, true
  expect(myMock()).toBe(10);
  expect(myMock()).toBe('x');
  expect(myMock()).toBe(true);
  expect(myMock()).toBe(true);

  console.log(JSON.stringify(myMock.mock.results));
});
