test('mock return values', () => {
  const myMock = jest.fn();
  console.log(myMock());  // undefined

  myMock
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    .mockReturnValue(true);

  expect(myMock()).toBe(10);
  expect(myMock()).toBe('x');
  expect(myMock()).toBe(true);
  expect(myMock()).toBe(true);
});

test('filter mock function return values', () => {
  const filterTestFn = jest.fn();

  filterTestFn
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false);

  const result = [11, 12].filter(num => filterTestFn(num));
  expect(result).toMatchObject([11]);
  expect(filterTestFn.mock.calls[0]).toMatchObject([11]);
  expect(filterTestFn.mock.calls[1]).toMatchObject([12]);
});