Week 05：Mock Functions
===

mock 函數可透過擦除函數的實際實作，捕捉對該函數的呼叫 (以及在該呼叫中傳遞的參數)，使用 `new` 實例化時捕捉建構函數的 instance，並允許在測試時配置回傳值。

有兩種方法來 mock 函數：
- 建立一個在測試程式碼中使用的 mock 函數
- 寫一個[手動 mock](https://jestjs.io/docs/en/manual-mocks) 來覆蓋依賴模組

## 使用 mock 函數

`jest.fn(implementation)`：回傳一個新的未使用的 mock 函數，可選的 mock 實作

若要測試下面 `forEach()`，可用 mock 函數，並檢查 mock 的狀態，以確保按預期 invoke callback：

```javascript
// jestDoc/src/forEach.js
function forEach(items, callback) {
  for (const item of items) {
    callback(item);
  }
}
```

```javascript
// jestDoc/__tests__/forEach.test.js
import forEach from '../src/forEach';

test('forEach', () => {
  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  console.log(mockCallback.mock.calls);  // [[0], [1]]

  expect(mockCallback.mock.calls.length).toBe(2);

  expect(mockCallback.mock.calls[0][0]).toBe(0);
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  expect(mockCallback.mock.results[0].value).toBe(42);
  expect(mockCallback.mock.results[1].value).toBe(43);
});
```

## `.mock` property

所有 mock 函數都有 `.mock` property，用來儲存如何呼叫函數和回傳函數的資料，此 property 也會追蹤每個呼叫的 `this` 值：

- `mockFn.mock.calls`：
  - 回傳一個陣列
  - 包含對此 mock 函數所有呼叫的呼叫 argument，此陣列中的每個項目都是在呼叫過程中傳遞的 argument 陣列
  - 例如：有一個 mock 函數被呼叫兩次，第一次被呼叫的 argument 為 `f('arg1', 'arg2')`，第二次為 `f('arg3', 'arg4')`，那此 `f.mock.calls` 會回傳 `[['arg1', 'arg2'], ['arg3', 'arg4']]`
- `mockFn.mock.results`：
  - 回傳一個陣列
  - 包含對此 mock 函數所有呼叫的結果，此陣列中的每個項目都是一個包含 `type` 和 `value` property 的物件
    - `type` 為以下任一種：
      - `return`：透過正常回傳已完成的呼叫
      - `throw`：透過拋出一個值來完成呼叫
      - `incomplete`：呼叫尚未完成。若從 mock 函數本身內部或從 mock 呼叫的函數內部測試結果，則會發生這種狀況
    - `value`：
      - 包含拋出的值或回傳值
      - 當 `type === 'incomplete'` 時，值為定義
- `mockFn.mock.instances`：
  - 回傳一個陣列
  - 包含使用 `new` 從此 mock 函數實例化的所有物件 instance

```javascript
// jestDoc/__tests__/mockProperty.test.js
it('mock property', () => {
  const fooMockFunction = jest
    .fn(function (x, y) {
      let tmp = this.x || 0;
      return tmp + x + y;
    });

  const a = new fooMockFunction('first arg', 'second arg');
  console.log(a);    // mockConstructor {}
  console.log(a.x);  // undefined
  
  const b = {x: 10};
  const bound = fooMockFunction.bind(b, 3, 4);
  console.log(bound());  // 17

  console.log(fooMockFunction.mock);
  // {
  //   calls: [ [ 1, 2 ], [ 3, 4 ] ],
  //   instances: [ mockConstructor {}, { x: 10 } ],
  //   invocationCallOrder: [ 1, 2 ],
  //   results: [
  //     { type: 'return', value: 3; },
  //     { type: 'return', value: 17 }
  //   ]
  // }

  console.log(fooMockFunction.mock.instances[0]);  // mockConstructor {}
  console.log(fooMockFunction.mock.instances[1]);  // { x: 10 }

  // 呼叫幾次
  expect(fooMockFunction.mock.calls.length).toBe(2);

  // 第幾次呼叫的第幾個 arg
  expect(fooMockFunction.mock.calls[0][0]).toBe('first arg');
  expect(fooMockFunction.mock.calls[0][1]).toBe('second arg');
  expect(fooMockFunction.mock.calls[1][0]).toBe(3);
  expect(fooMockFunction.mock.calls[1][1]).toBe(4);

  // 第幾次呼叫的回傳值
  expect(fooMockFunction.mock.results[1].value).toBe(17);

  // 此 mock 函數被實例化的次數
  expect(fooMockFunction.mock.instances.length).toBe(2);
});
```

## mock 回傳值

使用 mock 函數在測試期間將測試值注入至程式碼中：

```javascript
// jestDoc/__tests__/mockReturnValues.test.js
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
```

這種寫法可避免需要複雜的 stub 來重新建立實際元件的行為，利於在使用前將值直接注入到測試中。

:::info
Test stub：回傳固定值的實作

資料來源：[搞笑談軟工: Test Double（2）：五種替身簡介](http://teddy-chen-tw.blogspot.com/2014/09/test-double2.html)
:::

```javascript
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
```

儘量避免在沒有直接測試的函數內部實作邏輯。

## mocking 模組

假設有一個從 API feych 使用者的 class，該 class 使用 [`axios`](https://github.com/axios/axios) 呼叫 API，然後回傳包含所有使用者的 `data` 屬性：

```javascript
// jestDoc/src/users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => response.data);
  }
}

export default Users;
```

若要在不實際打 API 的情況下測試該方法，可用 `jest.mock()` 自動 mock `axios` 模組。

接著為 `.get` 提供 `.mockResolvedValue` 來回傳測試要 assert 的資料，也就是 `axios.get('url')` 要回傳的 fake response：

```javascript
// jestDoc/__tests__/mockingModule.test.js
import axios from 'axios';
import Users from '../src/users';

jest.mock('axios');

test('should fetch users', () => {
  const expected = [{name: 'Titan'}];
  const response = {data: expected};
  axios.get.mockResolvedValue(response);
  
  // 或可用以下：
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(expected));
});
```

## Mock Implementations

指定回傳值，以及完全替換 mock 函數的實作，可透過 `jest.fn` 或 `mock` 函數上的 `mockImplementationOnce()` 來完成：

```javascript
// jestDoc/__tests__/mockImplementation.test.js
describe('使用 `jest.fn()` 建立 mock 函數', () => {
  it('mock 函數', () => {
    const myMockFn = jest.fn(callback => callback(null, true));
    myMockFn((err, val) => console.log(val));

    expect(myMockFn).toBeCalledTimes(1);
    expect(myMockFn).lastCalledWith(expect.any(Function));
  });
});
```

可用 `mockImplementationOnce()` 來定義 mock 函數的預設實作：

```javascript
// jestDoc/__tests__/mockImplementation.test.js
import foo from '../src/foo';

jest.mock('../src/foo');

describe('mock module', () => {
  it('mock foo module', () => {
    foo.mockImplementation(() => 42);
    foo();

    expect(foo).toBeCalledTimes(1);
    expect(foo).toReturnWith(42);
  });
});
```

若要讓 mock 函數多次呼叫會產生不同的結果，也可用 `mockImplementationOnce()` 來定義。

```javascript
// jestDoc/__tests__/mockImplementation.test.js
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
});
```

當 mock 函數執行完 `mockImplementationOnce()` 定義的實作時，會執行 `jest.fn` (若已定義) 的預設實作集合：

```javascript
// jestDoc/__tests__/mockImplementation.test.js
describe('mock 函數呼叫多次時，會產生不同的結果', () => {
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
```

若要回傳 `this`，可用 sugary API `.mockReturnThis()` 來簡化方法。

下面是相同的兩種寫法：
- 使用 `.mockReturnThis()`
- 使用 `jest.fn()` 自己實作 mock 函數要回傳 `this`

```javascript
// jestDoc/__tests__/mockImplementation.test.js
describe.only('mock 函數回傳 `this`', () => {
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
```

## mock 名稱

可為 mock 函數命名，可在測試錯誤的輸出中顯示名稱，而不是 `jest.fn()`。若想快速識別 mock 函數，並在測試輸出中 report 錯誤，可用此方式：

```javascript
describe('mock 名稱', () => {
  it.only('設定 mock 名稱', () => {
    const myMockFn = jest.fn()
      .mockImplementation(scalar => 42 + scalar)
      .mockName('add42');

    myMockFn(10);
    myMockFn(10);
    myMockFn(10);

    expect(myMockFn).toBeCalledTimes(3);
    expect(myMockFn).toReturnWith(52);
  });
});
```

若沒設定 mock 函數名稱，測試錯誤時會像這樣：

```shell
FAIL week-05/jestDoc/__tests__/mockName.test.js

  ● mock 名稱 › 設定 mock 名稱

    expect(jest.fn()).toReturnWith(expected)
    ...
```

若有設定名稱就會像這樣：

```shell
FAIL week-05/jestDoc/__tests__/mockName.test.js

  ● mock 名稱 › 設定 mock 名稱

    expect(add42).toReturnWith(expected)
    ...
```

## 自訂 matcher

下面是 mock 函數會用到的 matcher，這些都是語法糖：

```javascript
// mock 函數被呼叫的次數
expect(mockFunc).toBeCalledTimes(4);

// mock 函數至少被呼叫一次
expect(mockFunc).toBeCalled();
expect(mockFunc).toHaveBeenCalled();

// 至少一次呼叫 mock 函數所指定的 args
expect(mockFunc).toBeCalledWith(arg1, arg2);
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

// 最後一次呼叫 mock 函數所指定的 args
expect(mockFunc).lastCalledWith(arg1, arg2);
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

// 所有呼叫和 mock 的名稱都寫成 snapshot
expect(mockFunc).toMatchSnapshot();
```

這些 matcher 是檢查 `.mock` property 的常見形式的 sugar。

```javascript
// mock 函數被呼叫的次數
expect(mockFunc.mock.calls.length).toBe(4);

// mock 函數至少被呼叫一次
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// 至少一次呼叫 mock 函數所指定的 args
expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

// 最後一次呼叫 mock 函數所指定的 args
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);

// 最後一次呼叫 mock 函數的第一個 arg 是 `42` (此 assert 沒有語法糖)
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// snapshot 會檢查 mock 是否以相同的順序、相同的 arg 被呼叫相同的次數
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);

// assert mock 函數的名稱
expect(mockFunc.getMockName()).toBe('a mock name');
```

例如：

```javascript
// jestDoc/__tests__/customMatcher.test.js
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
```