
it.only('模擬實作', () => {
  const myMockFn = jest.fn(cb => cb(null, true)); // 回調函式
  myMockFn((err, val) => console.log(err, val));

  // console.log(myMockFn((err, val)));

  expect(myMockFn).toHaveBeenCalledWith();
  // > null, true
});

it('模擬實作_自定義函式', () => {
  jest.mock('../week5_Mock Functions/foo.js'); // this happens automatically with automocking
  const foo = require('../week5_Mock Functions/foo.js');
  console.log("foo", foo);

  // foo is a mock function
  foo.mockImplementation(() => 42);
  console.log(foo()); // > 42
});

it('模擬實作_多個函式調用', () => {
  const myMockFn = jest
    .fn()
    .mockImplementationOnce(cb => cb(null, true))
    .mockImplementationOnce(cb => cb(null, false));

  myMockFn((err, val) => console.log(err, val));
  // > null, true
  myMockFn((err, val) => console.log(err, val));
  // > null, false
});

it('模擬實作_執行默認值', () => {
  const myMockFn = jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call');

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn(), myMockFn());
  // > 'first call', 'second call', 'default', 'default', 'default'
});