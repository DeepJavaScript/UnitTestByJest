import { integerValue, floatValue } from "./app.js";

test('two plus two', () => {
  expect(integerValue).toBeGreaterThan(3);
  expect(integerValue).toBeGreaterThanOrEqual(3.5);
  expect(integerValue).toBeLessThan(5);
  expect(integerValue).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(integerValue).toBe(4);
  expect(integerValue).toEqual(4);
});

test('adding floating point numbers', () => {
  // expect(floatValue).toBe(0.3);    // This won't work because of rounding error
  expect(floatValue).toBeCloseTo(0.3); // This works.
});