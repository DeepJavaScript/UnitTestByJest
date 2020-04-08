import * as testFn from '../js/repeat_setup'

beforeEach(() => {
  testFn.getFruitData();
  console.log("Output: testFn.getFruitData();", testFn.getFruitData());
})

afterEach(() => {
  testFn.clearFruitData();
  console.log("Output: testFn.clearFruitData();", testFn.clearFruitData());
})

// beforeAll(() => {
//   console.log('Do something before tests execute.');
// })

// afterAll(() => {
//   console.log('Do something after tests finished.');
// })

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