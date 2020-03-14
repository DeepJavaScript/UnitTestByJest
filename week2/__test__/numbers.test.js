import { multiple, sum } from "../js/numbers";

test("two multiple two", () => {
  expect(multiple(2, 2)).toBeGreaterThan(3);
  expect(multiple(2, 2)).toBeGreaterThanOrEqual(4.0);
  expect(multiple(2, 2)).toBeLessThan(5);
  expect(multiple(2, 2)).toBeLessThanOrEqual(4);
  expect(multiple(2, 2)).toBe(4);
  expect(multiple(2, 2)).toEqual(4);
  expect(multiple(2, 2)).toBeCloseTo(4);
});

test("floating number calculation", () => {
  expect(sum(0.1, 0.2)).toBeGreaterThanOrEqual(0.3);
  expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
});
