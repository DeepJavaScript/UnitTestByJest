jest.mock('./emptyImplement'); // this happens automatically with automocking
const emptyImplement = require('./emptyImplement');

test('mock empty module', () => {
  // emptyImplement is a mock function
  emptyImplement.mockImplementation(() => 42);

  expect(emptyImplement()).toBe(42);
});

test('mock mockImplementationOnce', () => {
  const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

  myMockFn((err, val) => console.log(val));
  // > true

  myMockFn((err, val) => console.log(val));
  // > false

  expect(myMockFn.mock.calls.length).toBe(2);
  expect(myMockFn.mock.calls[0][0]).toBeInstanceOf(Function);
  expect(myMockFn.mock.calls[1][0]).toBeInstanceOf(Function);
});

test('mock mockImplementationOnce call lots of times', () => {
  const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

  expect(myMockFn()).toMatch('first call');
  expect(myMockFn()).toMatch('second call');
  expect(myMockFn()).toMatch('default');
  expect(myMockFn()).toMatch('default');

  expect(myMockFn.mock.calls[0][0]).toBeUndefined();
  expect(myMockFn.mock.calls[1][0]).toBeUndefined();
  expect(myMockFn.mock.calls[2][0]).toBeUndefined();
  expect(myMockFn.mock.calls[3][0]).toBeUndefined();
  expect(myMockFn.mock.calls.length).toBe(4);
});