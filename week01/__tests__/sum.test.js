const sum = require('../js/sum');

test('adds 1 + 2 to equal 3', () => {
    const a = 1,
        b = 2;
    const total = sum(a, b);
    expect(total).toBe(3);
});