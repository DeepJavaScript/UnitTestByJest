test('Use toBe compare string or number', () => {
  expect(3).toBe(3);
  expect('t').toBe('t');
});

/* Will be fail
test('Use toBe compare object or array', () => {
  expect({ name: 'Clark', }).toBe({ name: 'Clark', });
  expect([1, 2, 3]).toBe([1, 2, 3]);
});
*/

test('Use toEqual compare object or array', () => {
  expect({ name: 'Clark', }).toEqual({ name: 'Clark', });
  expect([1, 2, 3]).toEqual([1, 2, 3]);
});

/* Will be fail
test('Use .not let test fail', () => {
  expect(3).not.toBe(3);
  expect('t').not.toBe('t');
});
*/

test('Distinguish between null, undefined and false', () => {
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();

  expect(true).toBeTruthy();
  expect('1').toBeTruthy();
  expect(123).toBeTruthy();

  expect(false).toBeFalsy();
  expect(0).toBeFalsy();
  expect(null).toBeFalsy();
  expect(undefined).toBeFalsy();
});

test('Expect number besides the toBe', () => {
  const n = 5;
  expect(n).toBeGreaterThan(2);
  expect(n).toBeGreaterThanOrEqual(5);
  expect(n).toBeLessThan(6);
  expect(n).toBeLessThanOrEqual(5);
});

test('Expect floating point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); // FAIL
  expect(value).toBeCloseTo(0.3);
});

test('Use toMatch with regular expressions', () => {
  expect('Hello world').toMatch(/orl/);
});

test('Use toContain check array', () => {
  const array = ['apple', 'banana'];
  expect(array).toContain('banana');
});

test('Use toContain check iterables', () => {
  function* generate(n) {
    for(let i = 0; i <= n; i++){
      yield i;
    }
  }
  const i = generate(10);

  expect(i).toContain(5);
});

test('Use toThrowError check error', () => {
  const throwError = (msg) => {
   throw new Error(msg);
  }

  expect(throwError).toThrow();
  expect(throwError).toThrow(Error);

  const actual = () => { throwError('error message'); };
  expect(actual).toThrow('error message');
});