import {
  addCity,
  clearCityDB,
  initCityDB,
  isCity
} from '../../src/cityDB';

describe('使用 beforeEach 和 afterEach 對多個測試重複設定', () => {
  beforeEach(() => {
    console.log(`--- beforeEach init DB Start ---`);
    initCityDB();
    console.log(`--- beforeEach init DB End ---`);
  });

  afterEach(() => {
    console.log(`--- afterEach clear DB Start ---`);
    clearCityDB();
    console.log(`--- afterEach clear DB End ---`);
    console.log(`=========================================`);
  });

  test('新增 Kaohsiung', () => {
    console.log(`--- test1 Start ---`);
    expect(isCity('Kaohsiung')).toBeFalsy();
    addCity('Kaohsiung');
    expect(isCity('Kaohsiung')).toBeTruthy();
    console.log(`--- test1 End ---`);
  });
  
  test('有 Tainan，但沒有 Kaohsiung', () => {
    console.log(`--- test2 Start ---`);
    expect(isCity('Tainan')).toBeTruthy();
    expect(isCity('Kaohsiung')).toBeFalsy();
    console.log(`--- test2 End ---`);
  });
});
