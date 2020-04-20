## Jest - Mock Functions

Mock 函式允許您通過刪除函式的實作、捕獲對函式的調用(以及在這些調用中傳遞的參數)、透過使用 new 捕獲建構函式的實例以及允許返回值的測試時，配置測試代碼之間的連結。

---

### 搞笑談軟工 - 在介紹 Test Double 之前先介紹兩個測試常用術語：

- **SUT**：System Under Test 或 Software Under Test 的簡寫，代表**待測程式**。如果是單元測試，SUT 就是一個 function 或 method。
- **DOC**：Depended-on Component (相依元件)，又稱為 Collaborator (合作者)。DOC 是 SUT 執行的時候會使用到的元件。

:::warning
在做單元測試的時候，測試對象是 SUT，但因為 SUT 會呼叫其他物件，使得 SUT 相依於 DOC。換句話說，**要測試 SUT，DOC 也必須存在，這使得測試變得更複雜**。
:::

---    

### Test Double 解決什麼問題?

在《xUnit Test Patterns》書中提到 Test Double 可以解決兩個常見的測試問題：

- **如何單獨驗證 SUT 的邏輯而不用真的使用到 DOC？**
- **如何避免測試執行太慢？**

Test Double 是一種讓 SUT 可以不依靠 DOC 而單獨被測試的作法，在實作上有五種 Test Double，分別是 Dummy Object、Test Stub、Test Spy、Fake Object 與 Mock Object。從 Test Double 與本尊之間的功能相似度來區分：

- **Dummy Object** 
根本沒有實作，是「假到非常假」的替身。
- **Test Stub**
其實作方式通常採用寫死某個特定回傳值的方式，用來應付「state verification」(狀態驗證)。
- **Test Spy** 
與 Stub 都有類似實作，Spy 則是用來應付「behavior verification」(行為驗證)，並記錄 SUT 與 DOC 之間的行為互動。
- **Fake Object** 
則是與本尊行為非常接近的替身，差別在於採用比較簡單的方式來實作本尊的功能。
- **Mock Object**
可以做到 Dummy、Stub、Spy 的功能，但比較無法做到 Fake。簡單的說，Mock 技術可以藉由 Mock Object Library 自動產生 Dummy、Stub 或 Spy 這三種 Test Double，而不需要開發人員自己動手寫。

:::info
如果說 jest.fn 能夠作為一個 Function 的替身，那麼 jest.mock 就是能模擬整個模組的 Mock！ - 神Ｑ超人
:::

# 空條承太郎（オラ！Ora！ オラ！Ora！ オラ！Ora！ オラ！Ora！ オラ！Ora！）

以 Mock 代替 DOC 做測試，就能確保只要邏輯有錯責任就一定是在 SUT 身上。

---

### 替身函式 jest.fn()

讓我們假設我們正在測試一個函式 forEach 的實作，這個函式將作為提供的陣列中，允許每個 item 調用 callback。

```javascript=
// forEach.js
function forEach(items, callback, ary = []) {
  for (let index = 0; index < items.length; index++) {
    ary.push(callback(items[index]));
  }
  return ary;
}

function callback(item) {
  return Math.pow(item, 2);
}

const square = forEach([2, 4], callback);
console.log(square);

module.exports = { forEach };
```
```javascript=
// forEach.test.js
import forEach from '../week5_Mock Functions/forEach';

it('使用 mock 函式', () => {
  const mockCallback = jest.fn(x => 42 + x); // 取代 DOC
  forEach([0, 1], mockCallback);
  
  console.log("mockCallback", mockCallback);

  // 此 mock 函式被調用了兩次
  expect(mockCallback.mock.calls.length).toBe(2);

  // 第一次調用函式時的第一個參數是 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // 第二次調用函式時的第一個參數是 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // 第一次函式調用的返回值是 42
  expect(mockCallback.mock.results[0].value).toBe(42);

  console.log("mockCallback.mock", mockCallback.mock);
});
```
```javascript=
/* mockCallback 
[Function: mockConstructor] {
  _isMockFunction: true,
  getMockImplementation: [Function],
  mock: [Getter/Setter],
  mockClear: [Function],
  mockReset: [Function],
  mockRestore: [Function],
  mockReturnValueOnce: [Function],
  mockResolvedValueOnce: [Function],
  mockRejectedValueOnce: [Function],
  mockReturnValue: [Function],
  mockResolvedValue: [Function],
  mockRejectedValue: [Function],
  mockImplementationOnce: [Function],
  mockImplementation: [Function],
  mockReturnThis: [Function],
  mockName: [Function],
  getMockName: [Function]
}*/
```
```javascript=
/* mockCallback.mock
{
  calls: [ [ 0 ], [ 1 ] ], 二維陣列
  instances: [ undefined, undefined ],
  invocationCallOrder: [ 1, 2 ],
  results: [ { type: 'return', value: 42 }, { type: 'return', value: 43 } ]
}
*/
```
```javascript=
/*
{
  mockCallback.mock { 
    calls: [], 
    instances: [], 
    invocationCallOrder: [], 
    results: [] 
  }
}
*/
```

---

### mock 屬性

所有的 mock 函式都有這個特殊的 mock 屬性，它保存了關於此函式如何被調用，調用時返回值的訊息。mock 屬性還追踪了調用時 this 的值，所以我們同樣可以也查看 this：

```javascript=
// mock.test.js
it('mock 屬性', () => {
  const myMock = jest.fn();

  const a = new myMock();
  a.name = "jest"
  const b = { name: "test" };
  const bound = myMock.bind(b);
  bound();

  console.log(myMock.mock.instances);
  // [ mockConstructor { name: 'jest' }, { name: 'test' } ]

  expect(myMock.mock.instances.length).toBe(2); 
  // 該函式被實例化了兩次

  expect(myMock.mock.instances[1].name).toEqual('test');
  // 該函式的第二個實例化返回的對象，具有一個 “name” 屬性，其值設置為 “test”
});
```
```javascript=
// mock.test.js
it('模擬返回值', () => {
  const myMock = jest.fn();
  console.log(myMock());
  // > undefined，目前未設定任何返回值

  myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
  // 進行預設回傳值

  console.log(myMock(), myMock(), myMock(), myMock());
  // > 10, 'x', true, true
});
```

在函式連續傳遞樣式（功能延續傳遞樣式）的代碼中時，模擬函式也非常有效。以這種代碼樣式避免複雜的中間操作，可以直觀地體現組件的真實含義，這有利於在其本身被調用之前，**將值直接注入到測試中**。

```javascript=
// mock.test.js
it('將值直接注入到測試中', () => {
  const filterTestFn = jest.fn();

  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
  // 設定第一次調用時回傳 true，第二次調用時回傳 false。

  const result = [11, 12].filter(num => filterTestFn(num)); 

  console.log(result); // [11]
  console.log(filterTestFn.mock); 
});
```
```javascript=
/*
{
  calls: [ [ 11 ], [ 12 ] ],
  instances: [ undefined, undefined ],
  invocationCallOrder: [ 1, 2 ],
  results: [ { type: 'return', value: true }, { type: 'return', value: false } ]
}
*/
```


---

### 替身模組 jest.mock

該 class 用 axios 調用 API 然後返回 data，並建立靜態方法：

```javascript=
// users.js
import axios from 'axios';

// 在 ES6 中可以透過 class 來建立 constructor
export default class Users {
  static all() {
    return axios
      .get("https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json")
      .then(res => res.data);
  }
}
```

為測試該方法而不實際調用 API，我們可以用 jest.mock(...) 函式自動模擬 axios 模組。當使用 jest.mock，我們可為 .get 提供一個 mockResolvedValue，它會返回假響應資料進行測試。

```javascript=
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');
// jest.mock(...) 函式自動模擬 axios 模組。

it('返回假響應資料進行測試', () => {
  const users = [{ name: 'Bob', age: 26 }];
  const res = { data: users };

  // .get 提供一個 mockResolvedValue，它會返回假資料進行測試。
  axios.get.mockResolvedValue(res);
  console.log("axios.get", axios.get);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(res))
  return Users.all().then(data => expect(data).toEqual(users));
});
```
```javascript=
// axios.get 
[Function: wrap] {
  _isMockFunction: true,
  getMockImplementation: [Function],
  mock: [Getter/Setter],
  mockClear: [Function],
  mockReset: [Function],
  mockRestore: [Function],
  mockReturnValueOnce: [Function],
  mockResolvedValueOnce: [Function],
  mockRejectedValueOnce: [Function],
  mockReturnValue: [Function],
  mockResolvedValue: [Function],
  mockRejectedValue: [Function],
  mockImplementationOnce: [Function],
  mockImplementation: [Function],
  mockReturnThis: [Function],
  mockName: [Function],
  getMockName: [Function]
}
```

---

### 模擬實作

超越指定返回值的功能並完全替換模擬功能的實作是有用的。這可以通過模擬函式 jest.fn 或 mockImplementationOnce 方法來完成。

```javascript=
// foo.test.js
const myMockFn = jest.fn(cb => cb(null, true)); // 回調函式
myMockFn((err, val) => console.log(val)); 
// > true
```

mockImplementation 當您需要定義從另一個模塊創建的模擬函式的默認實作時，該方法很有用：

```javascript=
// foo.js
module.exports = function () {
  // some implementation;
};

// foo.test.js
it('模擬實作_自定義函式', () => {
  jest.mock('../week5_Mock Functions/foo.js'); 
  // this happens automatically with automocking
  const foo = require('../week5_Mock Functions/foo.js');
  console.log("foo", foo);

  // foo is a mock function
  foo.mockImplementation(() => 42);
  console.log(foo()); // > 42
});
```

當您需要重新創建模擬函式的複雜行為以使多個函式調用產生不同的結果時，請使用以下mockImplementationOnce 方法：

```javascript=
// foo.test.js
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
```

當模擬函式用盡了自定義的實作指定時，其餘將執行實作 jest.fn (默認值)：

```javascript=
// foo.test.js
it('模擬實作_執行默認值', () => {
  const myMockFn = jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call');

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn(), myMockFn());
  // > 'first call', 'second call', 'default', 'default', 'default'
});
```

---

### mock 常用功能

當使用在物件方法時，我們提供了一個含糖的 API 以簡化取得 this 過程：

```javascript=
// foo.test.js
it('模擬實作_返回 this', () => {
  const myObj = {
    myMethod: jest.fn().mockReturnThis(),
  };

  // is the same as

  const otherObj = {
    myMethod: jest.fn(function () {
      return this;
    }),
  };
});
```

如果您希望能夠快速識別在測試輸出中報告錯誤的模擬功能，可為此命名而不是預設顯示 "jest.fn()"。

```javascript=
it('模擬名稱_自訂命名', () => {
  const myMockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockImplementation(scalar => 42 + scalar)
    .mockName('oraoraora'); // myMockFn jest.fn()
  console.log("myMockFn", myMockFn.getMockName());
});
```

### 自定義匹配器

最後，為了減少對如何調用模擬函式的要求，我們為您添加了一些自定義匹配器函式：

```javascript=
// others.test.js
it('自定義匹配器', () => {
  const x = 4;
  const myMockFn = jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call')
    .mockImplementationOnce(x => x * x);

  console.log(myMockFn(), myMockFn(), myMockFn(x), myMockFn(), myMockFn());
  // > 'first call', 'second call', 16, 'default', 'default'

  expect(myMockFn).toHaveBeenCalled();
  // The mock function was called at least once

  expect(myMockFn).toMatchSnapshot();
  // All calls and the name of the mock is written as a snapshot

  expect(myMockFn).toHaveBeenCalledWith(x);
  // The mock function was called at least once with the specified args
});
```

---

### 神Q超人 - jest.spyOn()

SUT 一直享受著假資料帶來的美好，當過程中動用到 DOC 邏輯等或修改回傳值時。上線時卻會有「什麼！這傢伙怎麼會回傳這種東西？測試明明就沒有錯！」之類的慘劇發生。


但是 jest.spyOn() 不同，它會去重現 DOC 的邏輯，即使在任何時候修改了它的任何內容都一樣，SUT 在測試時便會發現 DOC 已經和之前測試時有所不同，不論是邏輯、回傳值等等，這時候捕獲了真實資料的測試結果才會有效。

那 jest.mock() 整個那麼假，可以用在哪裡？用在模擬無法重現邏輯、或者根本不會去變動的第三方套件時。

---

[Test Double（1）：什麼是測試替身？](http://teddy-chen-tw.blogspot.com/2014/09/test-double1.html)
[Jest | JOJO是你？我的替身能力是 Mock ！](https://medium.com/enjoy-life-enjoy-coding/jest-jojo%E6%98%AF%E4%BD%A0-%E6%88%91%E7%9A%84%E6%9B%BF%E8%BA%AB%E8%83%BD%E5%8A%9B%E6%98%AF-mock-4de73596ea6e)
[測試情境＆測試替身](https://medium.com/@charliecc/%E6%B8%AC%E8%A9%A6%E6%83%85%E5%A2%83-%E6%B8%AC%E8%A9%A6%E6%9B%BF%E8%BA%AB-c39dc5bff0b1)