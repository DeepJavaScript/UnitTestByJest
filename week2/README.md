# Week 02 - Using Matchers

## Common Matchers

### `toBe()`

`toBe()` - test exact equality

### `toEqual()`

`toEqual()` - check the deep equality of an object.

```javascript=
const can1 = {
  flavor: "grapefruit",
  ounces: 12
};
const can2 = {
  flavor: "grapefruit",
  ounces: 12
};

test("have all the same properties", () => {
  expect(can1).toEqual(can2);
});

test("are not the exact same can", () => {
  expect(can1).not.toBe(can2);
});
```

## Data types

`expect anything`、`expect any`

```javascript=
expect.anything(); // matches anything but null or undefined
expect.any(Number); // matches anything that was created with the given constructor
```

```javascript=
const number = 3;
expect(number).toEqual(expect.any(Number));
```

## Truthiness

`toBeTruthy`、`toBeFalsy`、`toBeNull`、`toBeUndefined`、`toBeDefined`

```javascript=
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

## Numbers

`toBeGreaterThan`、`toBeGreaterThanOrEqual`、`toBeLessThan`、`toBeLessThanOrEqual`、
`toBe` and `toEqual` are equivalent for numbers.
`toBeClostTo()` use to test floating point equality. Expected difference: < 0.005

## Strings

`toMatch(Regex or String)`、`toContain(String)`

## Arrays and iterables

`toContain(item)`

## Exceptions

`toThrow`

```javascript=
test("compiling android goes as expected", () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);
  expect(compileAndroidCode).toThrow("you are using the wrong JDK");
  expect(compileAndroidCode).toThrow(/JDK/);
});
```

## JSON

use `jest-json-schema` library

### install jest-json-schema

```bash=
$ npm install --save-dev jest-json-schema
```

### Import jest-json-schema

```javascript=
import { matchers } from "jest-json-schema";
expect.extend(matchers);
```

### Basic use

```javascript=
import { matchers } from "jest-json-schema";
import { list } from "../js/list.json";

expect.extend(matchers);

test("test json format", () => {
  const schema = {
    type: "object",
    properties: {
      fruits: {
        type: "array",
        items: {
          type: "string"
        }
      },
      vegetables: {
        type: "array",
        items: {
          type: "object",
          required: ["veggieName", "veggieLike", "price"],
          properties: {
            price: {
              type: "number"
            }
          }
        }
      }
    }
  };
  expect(list).toMatchSchema(schema);
});
```

## Reference

-[jest official docs](https://jestjs.io/docs/en/using-matchers)

- [jest-json-schema](https://www.npmjs.com/package/jest-json-schema)
