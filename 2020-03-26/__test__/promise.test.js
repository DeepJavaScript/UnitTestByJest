const { promise } = require('../js/fetchData.js');


test('Promise Try', () => {
  return promise('Try', true).then(data => {
    expect(data).toBe('peanut butter');
    console.log(`--- Promise Try: End ---`)
  });
});

test('Promise Catch', () => {
  expect.assertions(1);
  return promise('Catch', false).catch(error => {
    expect(error).toBe('error');
    console.log(`--- Promise Catch: End ---`)
  });
});

test('Promise with Resolves', () => {
  return expect(promise('Catch', true)).resolves.toBe('peanut butter')
});

test('Promise with Reject', () => {
  expect.assertions(1);
  return expect(promise('Catch', false)).rejects.toBe('error')
});
