import { greeting } from "../js/string";

test('there is "hello" in the sentence', () => {
  expect(greeting("Jerry")).toMatch(/Hello/);
  expect(greeting("Jerry")).toMatch(/\w*/);
  expect(greeting("Jerry")).toContain("Hello");
});
