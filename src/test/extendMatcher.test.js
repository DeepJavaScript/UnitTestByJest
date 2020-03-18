function toBeWithInRange(received, floor, ceiling) {
  return received >= floor && received <= ceiling
    ? {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      }
    : {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
};

function toBeWithOutRange(received, floor, ceiling) {
  return received < floor || received > ceiling
    ? {
        message: () =>
          `expected ${received} not to be without range ${floor} - ${ceiling}`,
        pass: true,
      }
    : {
        message: () =>
          `expected ${received} to be without range ${floor} - ${ceiling}`,
        pass: false,
      };
};

expect.extend({
  toBeWithInRange,
  toBeWithOutRange,
});

describe('extend matchers', () => {
  describe('toBeWithInRange', () => {
    it('Should pass with input 5 & range 0 ~ 10', () => {
      expect(5).toBeWithInRange(0, 10);
    });
    it('Should not pass with input 10 & range 0 ~ 5', () => {
      expect(10).not.toBeWithInRange(0, 5);
    });
  });

  describe('toBeWithOutRange', () => {
    it('Should pass with input 0 & range 5 ~ 10', () => {
      expect(0).toBeWithOutRange(5, 10);
    });
    it('Should not pass with input 5 & range 0 ~ 10', () => {
      expect(5).not.toBeWithOutRange(0, 10);
    });
  });
});
