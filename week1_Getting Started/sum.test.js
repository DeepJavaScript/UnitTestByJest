// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

import * as adder from './sum';

describe('數字加分器', () => {
  it('adds 1 + 2 to equal 3', () => {
    const a = 1, b = 2;
    const addUp = adder.sum(a, b);
    expect(addUp).toBe(3);
  });
})