const fetchData = require('../js/async');

test('test fetchDataNotPromise', (done) => {
  // 準備
  function callback(data) {
    try {
      // throw Error()
      // 斷言
      expect(data).toBe('some data');
      done()
    } catch (e) {
      done(e);
    }
  }
  
  // 執行
  fetchData.fetchDataNotPromise(callback)
});


test.skip('test fetchDataReturnPromise', () => {
  return fetchData.fetchDataReturnPromise()
    .then(res => {
      expect(res).toBe('some data')
    })
});

test.skip('test fetchDataReturnPromise error', () => {
  expect.assertions(1);
  return fetchData.fetchDataReturnPromise()
    .catch(e => {
      expect(e).toBe('something error')
    })
});

test.skip('test fetchDataReturnPromise with matchers', () => {
  return expect(fetchData.fetchDataReturnPromise()).rejects.toBe('something error')
});

test.skip('test fetchDataReturnPromise error with matchers', () => {
  expect.assertions(1);
  return expect(fetchData.fetchDataReturnPromise()).rejects.toBe('something error')
});


// async/await

test.skip('test fetchDataReturnPromise with async/await', async () => {
  let res = await fetchData.fetchDataReturnPromise();
  expect(res).toBe('some data');
});

test.skip('test fetchDataReturnPromise error with async/await', async () => {
  expect.assertions(1);
  try {
    await fetchData.fetchDataReturnPromise();
  } catch (e) {
    expect(e).toBe('something error');
  }
});


// async/await and matchers
test.skip('test fetchDataReturnPromise with matchers and async/await', async() => {
  await expect(fetchData.fetchDataReturnPromise()).resolves.toBe('some data')
});
test.skip('test fetchDataReturnPromise error with matchers and async/await', async() => {
  expect.assertions(1);
  await expect(fetchData.fetchDataReturnPromise()).rejects.toBe('something error')
});