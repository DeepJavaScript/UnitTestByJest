import {
  addCity,
  clearCityDBCallback,
  initCityDBCallback,
  isCity
} from '../../src/cityDB';

describe('beforeEach 和 afterEach 使用 done 參數', () => {
  beforeEach(done => {
    function callback() {
      done();
    }
    
    console.log(`--- beforeEach callback init DB Start ---`);
    initCityDBCallback(callback);
    console.log(`--- beforeEach callback init DB End ---`);
  });

  afterEach(done => {
    function callback() {
      done();
    }
    
    console.log(`--- afterEach callback clear DB Start ---`);
    clearCityDBCallback(callback);
    console.log(`--- afterEach callback clear DB End ---`);
    console.log(`===============================================`);
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
})