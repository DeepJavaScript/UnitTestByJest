import {
  initCityDB,
  clearCityDB,
  isCity,
  addCity
} from '../../src/cityDB';

describe('未使用 beforeEach 和 afterEach', () => {
  describe('測試案例會互相汙染', () => {
    test('新增 Kaohsiung', () => {
      initCityDB();
      expect(isCity('Kaohsiung')).toBeFalsy();
      addCity('Kaohsiung');
      expect(isCity('Kaohsiung')).toBeTruthy();
    });

    test('第二個測試案例未重新設定，所以有 Kaohsiung', () => {
      expect(isCity('Kaohsiung')).toBeTruthy();
    });
  });

  describe('手動在每個測試案例重複設定', () => {
    test('新增 Kaohsiung', () => {
      initCityDB();
      expect(isCity('Kaohsiung')).toBeFalsy();
      addCity('Kaohsiung');
      expect(isCity('Kaohsiung')).toBeTruthy();
      clearCityDB();
    });
    
    test('第二個測試案例有重新設定，所以預設沒有 Kaohsiung', () => {
      initCityDB();
      expect(isCity('Tainan')).toBeTruthy();
      expect(isCity('Kaohsiung')).toBeFalsy();
      clearCityDB();
    });
  });
})