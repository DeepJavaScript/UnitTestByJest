const handler = require("./handler");

test("1 + 2 = 3", () => {
  expect(handler.handler(1, 2)).toBe(3);
});
test("4 + 2 = 6", () => {
  expect(handler.handler(4, 2)).toBe(6);
});
test("undefined + 2 = 輸入的數值有誤，請輸入正確數值", () => {
  expect(handler.handler(undefined, 2)).toBe("輸入的數值有誤，請輸入正確數值");
});
test("2 + undefined = 輸入的數值有誤，請輸入正確數值", () => {
  expect(handler.handler(2)).toBe("輸入的數值有誤，請輸入正確數值");
});

test("1 + 2 = 3", () => {
  expect(handler.sum([1, 2])).toBe(3);
});
test("4 + 2 = 6", () => {
  expect(handler.sum([4, 2])).toBe(6);
});

test("1 測試是否為數字", () => {
  expect(handler.filterNumber([1])).toBe(undefined);
});
