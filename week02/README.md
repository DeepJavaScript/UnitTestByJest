# Using Matchers

### toBe
Use `toBe` compare string or number:

```javascript
test('Use toBe compare string or number', () => {
  expect(3).toBe(3); // PASS
  expect('t').toBe('t'); // PASS
});
```

But it can not compare if type is object or array:

```javascript
test('Use toBe compare object or array', () => {
  expect({ name: 'Clark', }).toBe({ name: 'Clark', }); // FAIL
  expect([1, 2, 3]).toBe([1, 2, 3]); // FAIL
});
```

### toEqual
If you want expect onject or array, your should be use `toEqual`:

```javascript
test('Use toEqual compare object or array', () => {
  expect({ name: 'Clark', }).toEqual({ name: 'Clark', }); // PASS
  expect([1, 2, 3]).toEqual([1, 2, 3]); // PASS
});
```

### .not
Use `.not` can provider test for the opposite of a matcher:

```javascript
test('Use .not let test fail', () => {
  expect(3).not.toBe(3); // FAIL
  expect('t').not.toBe('t'); // FAIL
});
```

### Truthiness
If you need distinguish between null, undefined and false in test, Jest also provider correspond matchers:

- `toBeNull` matches only null
- `toBeUndefined` matches only undefined
- `toBeTruthy` matches anything that an if statement treats as true, ex: 1, '2', true etc.
- `toBeFalsy` matches anything that an if statement treats as false, ex: null, undefined, 0, false etc.

```javascript
test('Distinguish between null, undefined and false', () => {
  expect(null).toBeNull(); // FAIL
  expect(undefined).toBeUndefined(); // FAIL
  
  expect(true).toBeTruthy(); // FAIL
  expect('1').toBeTruthy(); // FAIL
  expect(123).toBeTruthy(); // FAIL

  expect(false).toBeFalsy(); // FAIL
  expect(0).toBeFalsy(); // FAIL
  expect(null).toBeFalsy(); // FAIL
  expect(undefined).toBeFalsy(); // FAIL
});
```

### Numbers
Expect number besides the `toBe`, there are still other matchers:

- `toBeGreaterThan` meaning equivalent >
- `toBeGreaterThanOrEqual` meaning equivalent >=
- `toBeLessThan` meaning equivalent <
- `toBeLessThanOrEqual` meaning equivalent <=

```javascript
test('Expect number besides the toBe', () => {
  const n = 5;
  expect(n).toBeGreaterThan(2); // PASS
  expect(n).toBeGreaterThanOrEqual(5); // PASS
  expect(n).toBeLessThan(6); // PASS
  expect(n).toBeLessThanOrEqual(5); // PASS
});
```

If your want expect floating point equality, use `toBeCloseTo` instead of `toEqual`, because `toEqual` and `toBe` will be depend on a tiny rounding error.

```javascript
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); // FAIL
  expect(value).toBeCloseTo(0.3); // PASS
});
```

### Strings
Besides `toBe`, you also can choose `toMatch` with regular expressions

```javascript
test('Use toMatch with regular expressions', () => {
  expect('Hello world').toMatch(/orl/);
});
```

### Arrays and iterables

Use `toContain` can check if Arrays and iterables contain some value

#### Arrays
```javascript
test('Use toContain check array', () => {
  const array = ['apple', 'banana'];
  expect(array).toContain('banana');
});
```

#### iterables
```javascript
test('Use toContain check iterables', () => {
  function* generate(n) {
    for(let i = 0; i <= n; i++){
      yield i;
    }
  }
  const i = generate(10);

  expect(i).toContain(5);
});
```

### Exceptions
If you want test function throws an error when it's called, can use `toThrowError`

```javascript
test('Use toThrowError check error', () => {
  const throwError = (msg) => {
   throw new Error(msg);
  }

  expect(throwError).toThrow();
  expect(throwError).toThrow(Error);

  const actual = () => { throwError('error message'); };
  expect(actual).toThrow('error message');
});
```


