import { array } from "../js/array";

test("array has beer", () => {
  expect(array()).toContain("beer");
});
