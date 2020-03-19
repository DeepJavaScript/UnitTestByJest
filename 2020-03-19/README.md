# Using Matchers

承上週的進度

## Common Matchers

### 測試 Number

```javascript
test('測試: 2 + 2 = 4', () => {
  // 2 + 2 === 4
  expect(2 + 2).toBe(4);
});
```

### 測試 Object

```javascript
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

### 反邏輯

```javascript
test('測試: 1~9 任意相加 不是 0', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

## Truthiness

### null 轉成 Boolean

```javascript
// null === null
expect(null).toBeNull();
// null !== undefined
expect(null).toBeDefined();
expect(null).not.toBeUndefined();
// !!null !== true
expect(null).not.toBeTruthy();
// !!null === false
expect(null).toBeFalsy();
```

### 0 轉成 Boolean

```javascript
// 0 !== null
expect(0).not.toBeNull();
// 0 !== undefined
expect(0).toBeDefined();
expect(0).not.toBeUndefined();
// !!0 !== true
expect(0).not.toBeTruthy();
// !!0 === true
expect(0).toBeFalsy();
```

## Numbers

```javascript
const value = 2 + 2;
// 4 > 3
expect(value).toBeGreaterThan(3);
// 4 >= 3.5
expect(value).toBeGreaterThanOrEqual(3.5);
// 4 < 5
expect(value).toBeLessThan(5);
// 4 <= 4.5
expect(value).toBeLessThanOrEqual(4.5);

// toBe and toEqual are equivalent for numbers
// 4 === 4
expect(value).toBe(4);
// 物件比對用的 toEqual
expect(value).toEqual(4);
```

### 浮點數

因為浮點誤差，所以要用夾擊的，但你可以指定夾擊終點。

```javascript
const value = 0.1 + 0.2;
//expect(value).toBe(0.3);           This won't work because of rounding error
// 0.1 + 0.2 要落在 0.3 左右
expect(value).toBeCloseTo(0.3); // This works.
```

## Strings

用正規表達式 + `toMatch`

```javascript
expect('team').not.toMatch(/I/);
expect('Christoph').toMatch(/stop/);
// String 也可以用包含
expect('Christoph').toContain("Chris");
```

## Arrays and iterables

在 Array 可以查「包含某元素」

```javascript
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(new Set(shoppingList)).toContain('beer');
  expect(shoppingList).toContain('beer');
  // 可以測試 Array 是否相同
  expect(shoppingList).toEqual([
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
  ]);

});
```

## Exceptions

拋出例外，也可以測試。超好用。

```javascript
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```

## JSON Schema

```shell
npm install --save-dev jest-json-schema
```

