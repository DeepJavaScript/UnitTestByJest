# 如何使用 Jest 中的 Matcher

## 基本用法

`toBe` 測試基本型別，原理乃為 `Object.is`，若是需要測試 `物件` 請使用 `toEqual`

基本
```javascript
test("sum fun 1 + 2 = 3", () => {
  expect(handler.sum([1, 2])).toBe(3);
});
```

物件
```javascript
test("object assign", () => {
  const obj = { one: 1 };
  obj["two"] = 2;
  expect(obj).toEqual({ one: 1, two: 2 });
});
```

not 測試 `非`
```javascript
test("adding positive number is not zero", () => {
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
      expect(i + j).not.toBe(0);
    }
  }
});
```

* test 中可以同時測試多個 expect。（表示可以將完整的各類型測試整理在單一 test 中。）

### toBe() 之原理 Object.is()

Object.is(a ,b) ，確認 a、b 是否相同，相同返回 `true`；反之為 `false`。

* 同為 `undefined` `null` `true` `false` `相同Str` 返回 `true`
* 同為同一數字（包含 NaN），除了下列例外：
  * 但是 0 v.s. -0 返回  `fasle`

### 測試 `null` `undefined` `falsey`

```javascript
test("null", () => {
  const n = null;
  expect(n).toBe(null);
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});
```

### 測試 Array 中的某值

```javascript
test("[1,2,3] contain 2", () => {
  expect([1, 2, 3]).toContain(2);
});
```

### ToMatch 測試正則

比起 `/\/.test('str')` 中會自動轉型別，此處不會，除非轉換型別，只能針對字串測試。

### try catch error

可以使用 `toThrow` 但目前只看到針對 fun 去判別，而非整體執行的返回結果。