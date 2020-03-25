const { promise } = require('../js/fetchData.js');

test('Async/Await', async () => {
  let res = await promise('Async/Await', true);
  console.log(res);

  expect(res).toBe('peanut butter');
});

test('Async/Await with try catch', async () => {
  expect.assertions(1);
  try {
    await promise('Async/Await with try catch', false);
  } catch (e) {
    expect(e).toBe('error');
  }
});

test('Async/Await with resolves', async () => {
  await expect(promise('Async/Await with resolves', true)).resolves.toBe('peanut butter')
});
test('Async/Await with rejects', async () => {
  expect.assertions(1);
  await expect(promise('Async/Await with rejects', false)).rejects.toBe('error')
});