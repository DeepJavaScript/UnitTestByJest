# Setup and Teardown
- 每一次測試前後 (beforeEach、afterEach)，以及全部測試前後 (beforeAll、afterAll)
- 上述 Function 皆接受兩個參數，第一個參數為欲執行的 Function，第二個參數為 timeout 時間，預設為五秒。
若第一個 Function 需要異步執行，可用 return 回傳一個 promise，則 JEST 會等待。
- 先處理 All 在處理 Each


## 執行順序：

```javascript
// 無 describe 
1. 敘述句
2. beforeAll
3. beforeEach
4. test 
5. afterEach
6. afterAll
```

```javascript
// 有 describe
1. 敘述句
2. beforeAll
3. beforeEach
4. test 
5. afterEach
6. beforeAll (inside)
7. beforeEach
8. beforeEach (inside)
9. test (inside)
10. afterEach(inside)
11. afterEach
12. afterAll(inside)
13. afterAll
```

- 要注意的是  beforeEach、afterEach、beforeAll、afterAll 四個 function 與 scope 有關
- 敘述句的部分與 scope 無關， test 會先執行敘述句，因此如果有某些事前事後準備想與 describe 為單位，應該使用上述四個相對應的方法，而不是直接寫在  describe 內。describe 僅為 test 的 scope，並非執行的 scope。

```javascript
test('test sommething', () => {
  console.log('test something outside')
  expect(true).toBe(true);
});

describe('matching in describe scope', () => {
  trigger("I want to do someting in describe scope");
  test('test sommething inside', () => {
    console.log('test sommething inside')
    expect(true).toBe(true);
  });
})

// 執行結果：
// I want to dosometing in describe scope
// test something outside
// test sommething inside 
// 會發現  I want to do someting in describe scope 先執行了
```

- Jest 的流程：執行所有敘述句，收集 test，依照順序執行 test，並按照 test 所處的 scope 依序執行 beforeEach、afterEach、beforeAll、afterAll 四個 function。