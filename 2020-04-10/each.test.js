const {
  initializeCityDatabase,
  clearCityDatabase,
  isCity
} = require("./database.js")

beforeEach(() => {
  initializeCityDatabase("beforeEach vvvvvv initializeCityDatabase");
});

afterEach(() => {
  clearCityDatabase("afterEach ^^^^^^^ clearCityDatabase");
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

beforeEach(() => {
  return initializeCityDatabase("beforeEach vvvvvv async initializeCityDatabase");
});

beforeAll(() => {
  return initializeCityDatabase("beforeAll");
});

afterAll(() => {
  return clearCityDatabase("afterAll");
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});