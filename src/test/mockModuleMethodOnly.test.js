import axios from 'axios';

describe('Mock Module Method Only', () => {
  describe('Mock axios.get', () => {
    beforeEach(() => {
      axios.get = jest.fn(isResolve => isResolve
        ? Promise.resolve('resolved')
        : Promise.reject('rejected')
      );
    });

    it('Should get resolved with true argument', async () => {
      await expect(axios.get(true))
        .resolves.toBe('resolved');
    });

    it('Should get rejected with false argument', async () => {
      await expect(axios.get(false))
        .rejects.toBe('rejected');
    });
  });
});
