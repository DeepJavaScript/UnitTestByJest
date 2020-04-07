import {
  isCity,
  initializeCityDatabase,
  clearCityDatabase,
} from "../js/repeat_setup";

beforeEach(() => {
  return initializeCityDatabase();
});

afterEach(() => {
  return clearCityDatabase();
});

test("city database has Taipei", () => {
  expect(isCity("Taipei")).toBeTruthy();
});

test("city database has Taichung", () => {
  expect(isCity("Taichung")).toBeTruthy();
});
