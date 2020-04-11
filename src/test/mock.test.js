import axios from 'axios';

jest.mock('axios');

function axiosGet() {
  return axios.get();
};

describe('Mock Function', () => {
  describe('Execute mock function 5 times', () => {
    const mockFn = jest.fn((x, y) => x + y);

    beforeEach(() => {
      const executeTimes = 5;

      [...Array(executeTimes).keys()]
        .map(index => index +1)
        .forEach(time => { mockFn(time, time * 2) });

    }); 

    it('Execute times should be 5', () => {
      expect(mockFn.mock.calls.length).toBe(5);
    });

    it('First argument value should equal to execute time', () => {
      expect(mockFn.mock.calls[0][0]).toBe(1);
      expect(mockFn.mock.calls[1][0]).toBe(2);
      expect(mockFn.mock.calls[2][0]).toBe(3);
      expect(mockFn.mock.calls[3][0]).toBe(4);
      expect(mockFn.mock.calls[4][0]).toBe(5);
    });

    it('Second argument value should equal to execute time * 2', () => {
      expect(mockFn.mock.calls[0][1]).toBe(2);
      expect(mockFn.mock.calls[1][1]).toBe(4);
      expect(mockFn.mock.calls[2][1]).toBe(6);
      expect(mockFn.mock.calls[3][1]).toBe(8);
      expect(mockFn.mock.calls[4][1]).toBe(10);
    });

    it('Return value should be sum of first & second argument', () => {
      mockFn.mock.calls
        .forEach(([firstArg, secondArg], index) => {
          expect(mockFn.mock.results[index].value)
            .toBe(firstArg + secondArg);
        });
    });
  });
});

describe('Mock Module', () => {
  describe('Mock axios module', () => {
    it('Should get resolved res with axios.get.mockResolvedValue',
      async () => {
        axios.get.mockResolvedValue('resolved');
        await expect(axiosGet()).resolves.toBe('resolved');
      },
    );
  });
});
