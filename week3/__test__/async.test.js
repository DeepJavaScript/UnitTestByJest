const fetchData = require('../js/async');

test('test fetchDataNotPromise', (done) => {
  function callback(data) {
    console.log("callback")
    try {
      // throw Error()
      expect(data).toBe('peanut butter');
      done()
    } catch (e) {
      done(e);
    }
  }

  fetchData.fetchDataNotPromise(callback)
});


test.skip('test fetchDataReturnPromise', () => {
  expect.assertions(1);
  return fetchData.fetchDataReturnPromise()
    .then(res => {
      expect(res).toBe('peanut butter')
    })
    .catch(e => {
      expect(e).toBe('something error')
    })
});

test.skip('test fetchDataReturnPromise with matchers', () => {
  return expect(fetchData.fetchDataReturnPromise()).resolves.toBe('peanut butter')
  // return expect(fetchData.fetchDataReturnPromise()).rejects.toBe('something error')
});

test.skip('test fetchDataReturnPromise with async/await', async () => {
  try {
    let res = await fetchData.fetchDataReturnPromise();
    expect(res).toBe('peanut butter');
  } catch (e) {
    expect(e).toBe('something error');
  }
});

test('test fetchDataReturnPromise with matchers and async/await', async() => {
  // await expect(fetchData.fetchDataReturnPromise()).resolves.toBe('peanut butter')
  await expect(fetchData.fetchDataReturnPromise()).rejects.toBe('something error')
});