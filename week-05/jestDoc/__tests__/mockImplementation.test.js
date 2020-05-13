import foo from '../src/foo';

describe('使用 `jest.fn()` 建立 mock 函數', () => {
  it('mock 函數', () => {
    const myMockFn = jest.fn(callback => callback(null, true));
    myMockFn((err, val) => console.log(val));

    expect(myMockFn).toBeCalledTimes(1);
    expect(myMockFn).lastCalledWith(expect.any(Function));
  });
});

jest.mock('../src/foo');

describe('mock module', () => {
  it('mock foo module', () => {
    foo.mockImplementation(() => 42);
    foo();

    expect(foo).toBeCalledTimes(1);
    expect(foo).toReturnWith(42);
  });
});

describe('mock 函數呼叫多次時，會產生不同的結果', () => {
  it('第一次呼叫回傳 `true`，第二次回傳 `false`，之後都不回傳', () => {
    const myMockFn = jest.fn()
      .mockImplementationOnce(callback => callback(true))
      .mockImplementationOnce(callback => callback(false));

    myMockFn(value => value);
    myMockFn(value => value);
    myMockFn(value => value);
    myMockFn(value => value);

    expect(myMockFn).toBeCalledTimes(4);
    expect(myMockFn).nthReturnedWith(1, true);
    expect(myMockFn).nthReturnedWith(2, false);
    expect(myMockFn).nthReturnedWith(3);
    expect(myMockFn).nthReturnedWith(4);
  });

  it('第一次呼叫回傳 `first call`，第二次回傳 `second call`，之後都回傳 `default`', () => {
    const myMockFn = jest.fn(() => 'default')
      .mockImplementationOnce(() => 'first call')
      .mockImplementationOnce(() => 'second call');

    myMockFn();
    myMockFn();
    myMockFn();
    myMockFn();

    expect(myMockFn).toBeCalledTimes(4);
    expect(myMockFn).nthReturnedWith(1, 'first call');
    expect(myMockFn).nthReturnedWith(2, 'second call');
    expect(myMockFn).nthReturnedWith(3, 'default');
    expect(myMockFn).nthReturnedWith(4, 'default');
  });
});

describe('mock 函數回傳 `this`', () => {
  it('使用 `mockReturnThis()`', () => {
    const myObj = {
      myMethod: jest.fn().mockReturnThis()
    };

    myObj.myMethod();

    expect(myObj.myMethod).toBeCalledTimes(1);
    expect(myObj.myMethod).toReturnWith(myObj);
  });

  it('使用 `jest.fn()` 實作', () => {
    const myObj = {
      myMethod: jest.fn(function() {
        return this;
      })
    };

    myObj.myMethod();

    expect(myObj.myMethod).toBeCalledTimes(1);
    expect(myObj.myMethod).toReturnWith(myObj);
  });
});