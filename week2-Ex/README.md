# Using Matchers

僅列舉各類 matcher 中的幾個。

## `toBe()`

`toBe()` uses Object.is to test exact equality

## `toEqual()`

`toEqual()` check the value of an object.

## `toBeTruthy()`

`toBeTruthy()` matches anything that an if statement treats as `true`

## `toBeGreaterThan()`

`toBeGreaterThan()` use to compare numbers.

## `toBeClostTo()`

`toBeClostTo()` use to test floating point equality.

## `toContain()`

`toContain` use to check if an array or iterable contains a particular item.

Note: If items in array are object, use `toEqual()` instead .

## `toMatch()`

`toMatch` use to check string equality with regular expressions.

## `toMatchObject()`

1. `toMatchObject()` use to to check that a JavaScript object matches a **subset** of the properties of an object.
2. `toMatchOnject()` can also pass an array of objects.(We can only test partial properties to each objects.)

```javascript=
test('Matcher: toMatchObject, to check string equality with regular expressions.', () => {
  // Arrang
  let arr = [
    { a: 123 },
    {
      b: 456,
      c: 789
    }
  ];
  // Act 
  let getValue = testFn.getArray(arr);
  // Assert
  expect(getValue).toMatchObject([
    { a: 123 },
    { b: 456 }
  ]);
});
```

## `expect.extend(matchers)`

Custom matchers which you need.

[Link](https://jestjs.io/docs/en/expect#expectextendmatchers)


## Install jest-json-schema

```bash=
$ npm install --save-dev jest-json-schema
```

### Import jest-json-schema

```javascript
import { matchers } from 'jest-json-schema';
expect.extend(matchers);
```

### Basic use 

```javascript
test('Matcher: toMatchSchema', () => {
  const schema = {
    properties:  {
      hello: {type: 'string'}
    },
    required: ['hello'],
  }
  expect({ hello: 'world'}).toMatchSchema(schema)
});
```

## 參考資料

- [jest-json-schema](https://www.npmjs.com/package/jest-json-schema)
- [驗證資料的好幫手 - JSON Schema Validator](https://github.com/Hsueh-Jen/blog/issues/2#intro) 