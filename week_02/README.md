# Jest Unit Test - Week_02 - Mathcers
第二週認識常用的 Matchers。

## Common Matchers
常見的 Matchers：
- `.toBe()` 檢查值是否相等於指定值
- `.toEqual()` 可遞迴地檢查物件或陣列內的值，是否相等於指定值
- `.not.toBe()` 檢查值是否不相等於指定值

## Truthiness
用來檢查 `undefined`、`null`、`false`等特殊值：
- `toBeNull()` 檢查是否為 null
- `toBeUndefined()` 檢查是否為 undefined
- `toBeDefined()` 檢查是否為 defined
- `toBeTruthy()` 檢查是否為 true
- `toBeFalsy()` 檢查是否為 false

## Numbers
用來檢查相較值是否為指定結果：
- `.toBeGreaterThan()` 是否大於指定值
- `.toBeGreaterThanOrEqual()` 是否大於等於指定值
- `.toBeLessThan()` 是否小於指定值
- `.toBeLessThanOrEqual()` 是否小於等於指定值

## String
用來檢查 string 值內是否含有（或不含有）特定字串（指定字串要用 // 包裹）：
- `.not.toMatch(//)`
- `.toMatch(//)`

## Arrays and iterables
用來遞迴地檢查陣列內是否含有指定值：
- `.toContain()`

## Exceptions
用來檢查 funtion 是否回傳 error：
- `.toThrow()`

## 測試結構
```jest
describe('功能 / 介面描述', () => {
  describe('功能測試描述', () => {
    it('功能情境描述', () => {
      expect().matcher();
    })
  })
})
```