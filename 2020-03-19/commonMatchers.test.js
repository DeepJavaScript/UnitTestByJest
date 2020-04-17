import { 
  data,
  integerValue
} from "./app";

test('測試: 2 + 2 = 4', () => {
  expect(integerValue).toBe(4);
});

test('比對 Object', () => {
  expect(data).toEqual({ one: 1, two: 2 });
});

test('測試反邏輯: 1~9 任意相加 不是 0', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
