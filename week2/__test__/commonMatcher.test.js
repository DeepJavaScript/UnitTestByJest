import { sum, select } from "../js/commonMatcher";

test("two plus two is four", () => {
  expect(sum(2, 2)).toEqual(4);
  expect(sum(2, 2)).toBe(4);
});

test("object assignment", () => {
  const obj = { color: "red", size: "small" };
  expect(select("red", "small")).toEqual(obj);
  expect(select("red", "small")).not.toBe(obj);
});
