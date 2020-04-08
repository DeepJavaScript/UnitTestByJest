import * as testFn from '../js/test_only'

describe('Test sum function', () => {
  test('Test fn: sum', () => {
    // Arrange
    let a = 1, b = 2;
    // Act
    let getValue = testFn.sum(a, b);
    // Assert
    expect(getValue).toBe(3);
  });

  test('Test fn: sum2', () => {
    // Arrange
    let a = 1, b = 2;
    // Act
    let getValue = testFn.sum2(a, b);
    // Assert
    expect(getValue).toBe(3);
  });

  test.only('Test fn: sum3', () => {
    // Arrange
    let a = 1, b = 2;
    // Act
    let getValue = testFn.sum2(a, b);
    // Assert
    expect(getValue).toBe(3);
  });
})