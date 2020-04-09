import { fetchData, promiseFetchData } from '../src/fetchData';

describe('callback', () => {
  test('同步執行 callback 回傳 hi', () => {
    function callback(data) {
      console.log(`---callback: sync Start---`);
      expect(data).toBe('hi');
      console.log(`---callback: sync End---`);
    }
  
    fetchData(callback, 'sync');
  });
  
  test('非同步執行 callback 回傳 hi (有 try-catch)', done => {
    function callback(data) {
      try {
        console.log(`---callback: async Start---`);
        expect(data).toBe('hi');
        console.log(`---callback: async End---`);
        done();
      } catch (error) {
        done(error);
      }
    }
  
    fetchData(callback, 'async');
  });

  test('非同步執行 callback 回傳 hi (無 try-catch)', done => {
    function callback(data) {
      console.log(`---callback: async Start---`);
      expect(data).toBe('hi');
      console.log(`---callback: async End---`);
      done();
    }
  
    fetchData(callback, 'async');
  });
});

describe('promise', () => {
  test('promise resolve 的資料為 hi', () => {
    return promiseFetchData({ flag: 'success' }).then(data => {
      console.log(`--- then: Start ---`);
      expect(data).toBe('hi');
      console.log(`--- then: End ---`);
    });
  });

  test('promise reject 的錯誤訊息為 error', () => {
    expect.assertions(1);
    return promiseFetchData({ flag: 'fail' })
      .catch(e => {
        console.log(`--- catch: Start ---`);
        expect(e).toMatch('error');
        console.log(`--- catch: End ---`);
      });
  });

  test('使用 resolves matcher', () => {
    return expect(promiseFetchData({ flag: 'success' })).resolves.toBe('hi');
  });

  test('使用 rejects matcher', () => {
    return expect(promiseFetchData({ flag: 'fail' })).rejects.toMatch('error');
  });
});

describe('async / await', () => {
  test('使用 await resolves', async () => {
    const data = await promiseFetchData({ flag: 'success' });
    expect(data).toBe('hi');
  });

  test('使用 await rejects', async () => {
    expect.assertions(1);
    try {
      await promiseFetchData({ flag: 'fail' });
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  test('使用 await 和 resolves matcher', async () => {
    await expect(promiseFetchData({ flag: 'success' })).resolves.toBe('hi');
  });
  
  test('使用 await 和 rejects matcher', async () => {
    await expect(promiseFetchData({ flag: 'fail' })).rejects.toMatch('error');
  });
});