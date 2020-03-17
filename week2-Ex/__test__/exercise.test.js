import * as testFn from '../js/exercise'


describe('Use matchers exercise', () => {
  test('Matcher: toBe, to match value.', () => {
    // Arrange
    let a = 1, b = 2;
    // Act
    let getValue = testFn.sum(a, b);
    // Assert
    expect(getValue).toBe(3);
  });

  test('Matcher: toEqual, to match object.', () => {
    // Arrange
    let obj = { test: 'test'};
    // Act
    let getValue = testFn.getObject(obj);
    // Assert
    expect(getValue).toEqual({ test: 'new test'});
  });
  
  test('Matcher: toBeTruthy, to match truthy', () => {
    // Arrange 
    let num = 6;
    // Act
    let getValue = testFn.getBooleanValue(num);
    // Assert 
    expect(getValue).toBeTruthy();
  });

  test(`Matcher: toBeGreaterThan, to match 
        receive value greater than expect value.`,
    () => {
      // Arrange
      let a = 3, b = 4;
      // Act
      let getValue = testFn.sum(a, b);
      // Assert
      expect(getValue).toBeGreaterThan(5);
    });

  test('Matcher: toBeCloseTo, to match floating point equality', () => {
    // Arrang
    let a = 0.1, b = 0.2;
    // Act 
    let getValue = testFn.sum(a, b);
    // Assert
    expect(getValue).toBeCloseTo(0.3);
  });

})