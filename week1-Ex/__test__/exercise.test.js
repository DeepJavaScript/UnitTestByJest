const testFn = require('../js/exercise');
// console.log("Output: testFn", testFn)


describe('Use matchers exercise', () => {
  test('Matcher: toBe', () => {
    // Arrange
    let a = 1, b = 2;
    // Act
    let getValue = testFn.sum(a, b);
    // Assert
    expect(getValue).toBe(3);
  });
})