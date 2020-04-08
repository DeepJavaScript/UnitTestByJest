import {
  sum,
  greet
}
from "../js/commonMatcher";

describe('base', () => {
  test("two plus two is four", () => {
    // 等於
    expect(sum(2, 2)).toEqual(4);
    expect(sum(2, 2)).toBe(4);
  });

  // 物件等於，已遞迴的方式測試對象或是 Array
  test("object assignment", () => {
    const obj = {
      name: "Tracy",
      sentence: "Hello"
    };
    expect(greet("Tracy", "Hello")).toEqual(obj);
    // 不同
    expect(greet("Tracy", "Hello")).not.toBe(obj);
  });
});