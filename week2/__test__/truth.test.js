import { isNull, isUndefined, isZero, isOne } from "../js/truth";

test("null", () => {
  expect(isNull()).toBeNull();
  expect(isNull()).not.toBeTruthy();
  expect(isNull()).toBeDefined();
  expect(isNull()).not.toBeUndefined();
  expect(isNull()).toBeFalsy();
});

test("undefined", () => {
  expect(isUndefined()).not.toBeNull();
  expect(isUndefined()).not.toBeTruthy();
  expect(isUndefined()).not.toBeDefined();
  expect(isUndefined()).toBeUndefined();
  expect(isUndefined()).toBeFalsy();
});

test("zero", () => {
  expect(isZero()).not.toBeNull();
  expect(isZero()).not.toBeTruthy();
  expect(isZero()).toBeDefined();
  expect(isZero()).not.toBeUndefined();
  expect(isZero()).toBeFalsy();
});

test("one", () => {
  expect(isOne()).not.toBeNull();
  expect(isOne()).toBeTruthy();
  expect(isOne()).toBeDefined();
  expect(isOne()).not.toBeUndefined();
  expect(isOne()).not.toBeFalsy();
});
