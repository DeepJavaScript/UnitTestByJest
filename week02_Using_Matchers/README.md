# Week 02 - Using Matchers 匹配器

JEST Doc : [using-matchers](https://jestjs.io/docs/en/using-matchers)

Jest uses "matchers" to let you test values in different ways.

## test()

- test(name, fn, timeout)
  test 方法包含三個參數
  name ：測試名稱
  fn：包含測試期望的函數
  timeout：中止之前等待時間，默認為 5 秒(非同步會用到)

- 其他 function：
  `test.each` 使用不同數據進行相同測試
  `test.only` 於大型測試文件中，僅測試部分內容
  `test.skip` 於大型測試文件中，忽略部分測試
  `test.todo` 測試計畫

### expect()

- 進行測試時都應使用`expect`方法，搭配 matches 使用來聲明內容
- expect(value)
  value：正常情況下，為程式碼產生的值 -> 印出 expect
- expect() return 帶回有 matchers 的物件

```javascript
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

- expect 帶有許多屬性供使用，例如 anything

```javascript
test('two plus two is four', () => {
  expect(2 + 2).toEqual(expect.anything());
});
// 白話文： 期望(2+2) 等於 toEqual 另外一個期望值 expect.anything()
// expect.anything() 傳回 null , undefined 以外的
```

### 可選擇使用 describe 來將測試模組化整理

```javascript
describe('Group Name', () => {

}
```

# Commonly used matchers

## toBe()

`toBe()` - test exact equality
測試完全相同的結果

```javascript
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('對此測試的描述', () => {
  expect(code)).toBe(value);
});
```

## toEqual()

`toEqual()` - check the deep equality of an object.
測試物件裡的相等
