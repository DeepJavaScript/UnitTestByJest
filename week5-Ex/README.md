# Mock Functions

透過 mock function 可以讓我們關注在想要測試的目標函式，並將可能影響目標函式部分隔絕，以 mock function 中定義的內容取代，而在 mock function 中我們一樣可以傳遞參數讓函式執行。

這讓我們可以更加聚焦在於真正想要測試的函式。

## Using a mock function

建立一個 mock function 最簡單的方式就是 `jest.fn()`。

 `jest.fn()` 定義了許多我們在使用 mock function 時可以運用的方法，而這些方法在後續會提到部分:

```javascript=
const mock = jest.fn();
console.log(mock);

/*
{ 
  [Function: mockConstructor]
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
*/
```

如同官方範例，我們可以在 `jest.fn()` 中傳遞參數與自訂程式碼內容，如 `jest.fn(x => x + 42)`

### 使用 mock function 建立第一個測試函式

在官方範例中提供了一個簡單的 `forEach` 函式

假設我們今天想要測試的函式是 `forEach` 函式，此時我們需要注意幾件事情:

1. 清楚知道我們要測試的目標函式
2. 清楚知道我們需要透過 mock function 隔絕掉可能影響測試目標的函式

也就是說在測試 `forEach` 函式時我們需要將 `callback` 函式 mock 掉。

```javascript=
// exercise.js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

這邊我們透過 `jest.fn(x => x + 42);` 作為 `callback` 的 mock function。

在這裡我們必須先認識在 `mock` 屬性，當我們透過自定義的 mock function 取用 `mock` 屬性時，會得到一個物件的回傳如下：

```javascript=
const mockCallback = jest.fn(x => x + 42);
console.log(mockCallback.mock);

/*
  { 
    // 呼叫次數
    calls: [], 
    // 如果有實例
    instances: [], 
    // 依序呼叫
    invocationCallOrder: [], 
    // 該次執行結果存放處
    results: [] 
  }
*/
```

接著來看測試：

```javascript=
test('Fn: forEach', () => {                   
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
```

## Mocking Modules

透過 `jest.mock(modules)` 可以用來模擬一個模組的行為，這邊以 `axios` 為例:

### Axios Get method

對於測試 get method，重點在於取得回傳的資料。

所以我們要 mock 掉透過 get method 回傳資料的的部分。

首先先看看主程式中有一個用於非同步請求的函式:

```javascript=
async function getStations() {
  try {
    const endpoint = 'https://data.kcg.gov.tw/dataset/a98754a3-3446-4c9a-abfc-58dc49f2158c/resource/48d4dfc4-a4b2-44a5-bdec-70f9558cd25d/download/yopendata1070622opendatajson-1070622.json';
    const response = await axios.get(endpoint);
    return response.data;
  } catch(error) {
    console.log("Output: getStations -> err", error);
  }
}
```

接著我們在測試中使用了  `jest.mock('axios')` 用來模擬整個 axios modules ，並且使用 `mockResolvedValue()` 來傳入這個 get method 正常情況下應該要回傳的格式，作為假設請求成功時的回傳值:

```javascript=
jest.mock('axios');

describe('Test jestMock file', () => {
  test('Fn: getStations', async () => {
    // Arrange
    const chargeStations = [
      {
        Kind: "公共充電站",
        Charge: "免費",
        Location: "新興區公所 ",
        Address: " 高雄市新興區中正三路34號1樓(室內停車場)"
      }
    ];
    // api 回傳格式
    const response = { data: chargeStations };

    // Act
      // mockResolvedValue 可以用來模擬非同步回傳的值
      //這裡用來模擬 api 回傳的值(使用 get 方法) 
    axios.get.mockResolvedValue(response);
    
    // Assert
      // 官方使用 return 是為了避免測試比 promise 更早執行完畢。
    await testFn.getStations()
      .then(data => expect(data).toEqual(chargeStations));
  });
})

```

### Axios Post method

在 post 中，要測試的目標應該是從畫面上使用者輸入的值作為請求而送出的參數。

```javascript=
jest.mock('axios');

async function userLogin() {
  try {
    const endpoint = 'http://localhost:3000/login';
    const response = await axios.post(endpoint, {
      account: 'account',
      password: 'password'
    })
    return response.data

  } catch (error) {
    console.log("Output: register -> error", error);
  }
}

```

當測試執行時，可以透過 `calls` 屬性得到主程式被執行時，作為請求的參數。

而我們就透過取得的參數進行斷言。

```javascript=

 test('Fn: userLogin' , async () => {
    // Arrange
    const userInfo = {
      account: 'account',
      password: 'password'
    };
    // Act
      //這裡用來模擬發出登入請求(使用 post 方法) 
    const mockPost = axios.post.mockResolvedValue();
    await testFn.userLogin()

    // Assert
    const url = mockPost.mock.calls[0][0];
    expect(url).toBe('http://localhost:3000/login');

    const json = mockPost.mock.calls[0][1];
    expect(json).toEqual(userInfo);
  })

```

[Mock Functions methods](https://jestjs.io/docs/en/mock-function-api#methods)