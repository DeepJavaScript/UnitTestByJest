const {
  fetchData,
  fetchDataErr,
  fetchDataReject
} = require('./fetchDataPromise');

test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter')
  });
});

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchDataReject().catch(e => expect(e).toMatch('error'));
});

test('the fetch fails with an reject error(shorthand)', () => {
  return expect(fetchDataReject()).rejects.toMatch('error');
});
