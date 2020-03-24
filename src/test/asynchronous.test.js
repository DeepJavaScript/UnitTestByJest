import { promiseGenerator } from '../utils/promiseUtils';
import flushPromises from 'flush-promises';

describe('Asynchronous Code', () => {
  describe('Catch case', () => {
    it(
      'Should pass without enter catch',
      async () => {
        try {
          await promiseGenerator(true);

        } catch(err) {
          expect(err).toBe('rejected');
        };
      },
    );

    it(
      'Should not pass without enter catch & with expect.assertions(1)',
      async () => {
        expect.assertions(1);

        try {
          await promiseGenerator(true);

        } catch(err) {
          expect(err).toBe('rejected');
        };
      },
    );
  });

  describe('resolved promise', () => {
    it(
      'Should pass with resolves matcher',
      async () => {
        await expect(promiseGenerator(true))
          .resolves.toBe('resolved');
      },
    );
  });

  describe('rejected promise', () => {
    it(
      'Should pass with rejects matcher',
      async () => {
        await expect(promiseGenerator(false))
          .rejects.toBe('rejected');
      },
    );
  });

  describe('flushPromises case', () => {
    it(
      'Promise will not be done W/O flushPromises',
      async() => {
        let a;
        let b;
      
        Promise.resolve()
          .then(() => {
            a = 1;
          }).then(() => {
            b = 2;
          });
      
        expect(a).toBeUndefined();
        expect(b).toBeUndefined();
      },
    );

    it(
      'Promise will be done W/ flushPromises',
      async() => {
        let a;
        let b;
      
        Promise.resolve()
          .then(() => {
            a = 1;
          }).then(() => {
            b = 2;
          });

        await flushPromises();
      
        expect(a).toBe(1);
        expect(b).toBe(2);
      },
    );
  });
});
