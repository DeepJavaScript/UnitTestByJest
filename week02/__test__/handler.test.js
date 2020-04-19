// const handler = require("./handler");
import { sum, compileAndroidCode } from "../handler.js";

test("sum fun 1 + 2 = 3", () => {
  expect(sum([1, 2])).toBe(3);
});

test("object assign", () => {
  const obj = { one: 1 };
  obj["two"] = 2;
  expect(obj).toEqual({ one: 1, two: 2 });
});

test("adding positive number is not zero", () => {
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
      expect(i + j).not.toBe(0);
    }
  }
});

test("null", () => {
  const n = null;
  expect(n).toBe(null);
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("2 + 4", () => {
  expect(6).toBe(6);
  expect(6).toBeGreaterThan(3);
  expect(6).toBeGreaterThanOrEqual(3);
  expect(6).toBeLessThan(65);
  expect(6).toBeLessThanOrEqual(65);
});

test(".1 + .2 = .3", () => {
  const value = 0.2 + 0.1;
  expect(value).toBeCloseTo(0.3);
});

test("/d/", () => {
  expect("2").toMatch(/\d/);
  // 不能直接驗證數字，不會轉型
});

test("[1,2,3] contain 2", () => {
  expect([1, 2, 3]).toContain(2);
});

test("compiling android goes as expected", () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);
  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow("you are using the wrong JDK");
  expect(compileAndroidCode).toThrow(/JDK/);
});

test("array", () => {
  expect([1, 2]).toEqual([1, 2]);
});

test("sum fun 1 + 2 = 3", () => {
  expect(sum([1, 2])).toBe(3);
});

test("object assign", () => {
  const obj = { one: 1 };
  obj["two"] = 2;
  expect(obj).toEqual({ one: 1, two: 2 });
});

test("adding positive number is not zero", () => {
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
      expect(i + j).not.toBe(0);
    }
  }
});

test("null", () => {
  const n = null;
  expect(n).toBe(null);
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("2 + 4", () => {
  expect(6).toBe(6);
  expect(6).toBeGreaterThan(3);
  expect(6).toBeGreaterThanOrEqual(3);
  expect(6).toBeLessThan(65);
  expect(6).toBeLessThanOrEqual(65);
});

test(".1 + .2 = .3", () => {
  const value = 0.2 + 0.1;
  expect(value).toBeCloseTo(0.3);
});

test("/d/", () => {
  expect("2").toMatch(/\d/);
  // 不能直接驗證數字，不會轉型
});

test("[1,2,3] contain 2", () => {
  expect([1, 2, 3]).toContain(2);
});

test("array", () => {
  expect([1, 2]).toEqual([1, 2]);
});
