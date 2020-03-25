

import * as async from './TestingAsynchronousCode';

describe('Testing Asynchronous Code', () => {

  // it('the data is peanut butter', () => {
  //   function callback(data) {
  //     expect(data).toBe('peanut butter');
  //   }
  //   async.fetchData(callback);
  // });

  it('the data is peanut butter', done => {
    function callback(data) {
      try {
        expect(data).toBe('peanut butter');
        console.log(done);
        done();
      } catch (e) {
        done(e);
      }
    }
    async.fetchData(callback);
  });

  // it('the data is peanut butter', () => {
  //   return async.jestPromises().then(data => {
  //     expect(data).toBe('peanut butter');
  //   });
  // });

  // it('the fetch fails with an error', () => {
  //   expect.assertions(1);
  //   return async.jestPromises()
  //     // .then(res => expect(data).toBe('peanut butter'))
  //     .catch(e => expect(e).toMatch('Error'));
  // });

  // it('the data is peanut butter', () => {
  //   return expect(async.jestPromises()).resolves.toBe('peanut butter');
  // });

  // it('the fetch fails with an error', () => {
  //   return expect(async.jestPromises()).rejects.toMatch('Error');
  // });

  // it('the data is peanut butter', async () => {
  //   const data = await async.jestPromises();
  //   expect(data).toBe('peanut butter');
  // });

  // it('the fetch fails with an error', async () => {
  //   expect.assertions(1);
  //   try {
  //     await async.jestPromises();
  //   } catch (e) {
  //     expect(e).toMatch('Error');
  //   }
  // });

  // it('the data is peanut butter', async () => {
  //   await expect(async.jestPromises()).resolves.toBe('peanut butter');
  // });

  it('the fetch fails with an error', async () => {
    await expect(async.jestPromises()).rejects.toBe('Error');
  });

})
