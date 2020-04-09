import {
  addCity,
  initCityDBPromise,
  clearCityDBPromise,
  isCity
} from '../../src/cityDB';

describe('城市資料庫 (使用 beforeEach 和 afterEach 回傳 promise)', () => {
  beforeEach(() => {
    console.log(`--- beforeEach promise init DB Start ---`);
    return initCityDBPromise();
  });
  
  afterEach(() => {
    console.log(`--- afterEach promise clear DB Start ---`);
    return clearCityDBPromise();
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