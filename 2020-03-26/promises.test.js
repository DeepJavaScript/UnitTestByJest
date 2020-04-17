const {
  fetchData,
  fetchDataErr
} = require('./fetchDataPromise');

test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter')
  });
});

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchDataErr().catch(e => expect(e).toMatch('error'));
});

test('the data is peanut butter(shorthand)', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error(shorthand)', () => {
  return expect(fetchDataErr()).rejects.toMatch('error');
});