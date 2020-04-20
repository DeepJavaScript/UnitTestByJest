const {
  fetchData,
  fetchDataReject,
  fetchDataErr
} = require('./fetchDataPromise');

test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchDataReject();
  } catch (e) {
    expect(e).toMatch('error');
  }
});


test('the data is peanut butter(shorthand)', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an reject error(shorthand)', async () => {
  await expect(fetchDataReject()).rejects.toMatch('error');
});

test('the fetch fails with an exception error(shorthand)', async () => {
  await expect(fetchDataErr()).rejects.toThrow('error');
});
