import {
  initCityDBPromise,
  clearCityDBPromise,
  isCity
} from '../src/cityDB';

beforeAll(() => {
  console.log('beforeAll');
  return initCityDBPromise();
});

afterAll(() => {
  console.log('afterAll');
  return clearCityDBPromise();
});

test('有 Tainan', () => {
  console.log('test 1');
  expect(isCity('Tainan')).toBeTruthy();
});

test('沒有 Kaohsiung', () => {
  console.log('test 2');
  expect(isCity('Kaohsiung')).toBeFalsy();
});