## Setup and Teardown

### 多次測試重複設置

```javascript=
beforeEach(() => {
  console.log("beforeEach");
});

afterEach(() => {
  console.log("afterEach");
});

test('city database has Vienna', () => {
  console.log("Vienna");
});

test('city database has San Juan', () => {
  console.log("San Juan");
});

// "beforeEach"
// "Vienna"
// "afterEach"
// "beforeEach"
// "San Juan"
// "afterEach"
```

---

### 一次性設置

```javascript=
beforeAll(() => {
  console.log("beforeAll");
});

afterAll(() => {
  console.log("afterAll");
});

test('city database has Vienna', () => {
  console.log("Vienna");
});

test('city database has San Juan', () => {
  console.log("San Juan");
});

// "beforeAll"
// "Vienna"
// "San Juan"
// "afterAll"
```

---

### 作用域

**注意: 全域的 beforeEach 在 describe 區域的 beforeEach 之前被執行。這可能有助於說明所有 hooks 的執行順序。**

```javascript=
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

---

### desribe 和 test 的執行順序

Jest 會在所有真正的測試開始之前執行測試文件裡所有的 describe 處理程序 (handlers)。接下來會按照收集階段遇到的順序依次進行測試。

---

### 通用建議

僅想使用 Jest 運行單一測試，可將該 test 命令暫時更改為 test.only 即可。
run test: **Tests: 1 failed, 1 skipped, 2 total**