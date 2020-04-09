import {
  initCityDBPromise,
  clearCityDBPromise,
  isCity
} from '../../src/cityDB';

import {
  initFoodDBPromise,
  clearFoodDBPromise,
  isValidCityFoodPair
} from '../../src/foodDB';

// 適用於此文件中的所有測試
beforeEach(() => {
  console.log('global: beforeEach');
  return initCityDBPromise();
});

afterEach(() => {
  console.log('global: afterEach');
  return clearCityDBPromise();
});

test('城市資料庫有 Tainan', () => {
  console.log('global: test1');
  expect(isCity('Tainan')).toBeTruthy();
});

test('城市資料庫沒有 Kaohsiung', () => {
  console.log('global: test2');
  expect(isCity('Kaohsiung')).toBeFalsy();
});

describe('城市與食物 match', () => {
  // 僅適用於此 describe 區塊中的測試
  beforeEach(() => {
    console.log('scope: beforeEach');
    return initFoodDBPromise();
  });
  
  afterEach(() => {
    console.log('scope: afterEach');
    return clearFoodDBPromise();
  });
  
  test('Taipei <3 Apple', () => {
    console.log('scope: test1');
    expect(isValidCityFoodPair('Taipei', 'Apple')).toBe(true);
  });
  
  test('Tainan <3 Banana', () => {
    console.log('scope: test2');
    expect(isValidCityFoodPair('Tainan', 'Banana')).toBe(true);
  });
});