import {
  getData, getDataWithPromoseResolve, getDataWithPromoseReject,
} from '../js/action';

// callBack function never trigger, so this test always PASS.(But if together with next unit text will be success.)
test('Test getData without done', () => {
  const callBack = (result) => {
    console.log('Can\'t execute to here!')
    expect(result).toBe('XXOOOXXOXOXOO');
  };

  getData(callBack);
});

// Use done control end of test
test('Test getData with done', done => {
  const callBack = (result) => {
    console.log('Will be executed!')
    expect(result).toBe('data');
    done();
  };

  getData(callBack);
});

// Promise
test('Test getDataWithPromoseResolve', () => {
  return getDataWithPromoseResolve().then((result) => {
    expect(result).toBe('data');
  });
});

test('Test getDataWithPromoseReject', () => {
  return getDataWithPromoseReject().catch((result) => {
    expect(result).toBe('error');
  });
});

// Promise with and resolves and rejects
test('Test getDataWithPromoseResolve with resolve', () => {
  return expect(getDataWithPromoseResolve()).resolves.toBe('data');
});

test('Test getDataWithPromoseReject with reject', () => {
  return expect(getDataWithPromoseReject()).rejects.toBe('error');
});

// async await(I thought it will be throw error, but it no hahaha.)
test('Test getDataWithPromoseResolve with async/await', async () => {
  const actual = await getDataWithPromoseResolve();
  expect(actual).toBe('data');
});

test('Test getDataWithPromoseReject with async/await', async () => {
  try {
    await getDataWithPromoseReject();
  } catch(e) {
    expect(e).toBe('error');
  }
});
