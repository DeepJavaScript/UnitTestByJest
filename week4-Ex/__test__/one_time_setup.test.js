import * as testFn from '../js/one_time_setup'

beforeAll(() => {
  testFn.getFruitData();
  console.log("Output: testFn.getFruitData();", testFn.getFruitData());
})

afterAll(() => {
  testFn.clearFruitData();
  console.log("Output: testFn.clearFruitData();", testFn.clearFruitData());
})


describe('Test repeat_setup file function', () => {
  test('Test fn: getTargetFruit', () => {
    // Arrange
    let index = 0;
    // Act
    let getValue = testFn.getTargetFruit(index);
    // Assert
    expect(getValue).toBe('apple');
  });

  test('Test fn: getTargetFruit', () => {
    // Arrange
    let index = 2;
    // Act
    let getValue = testFn.getTargetFruit(index);
    // Assert
    expect(getValue).toBe('banana');
  });
})