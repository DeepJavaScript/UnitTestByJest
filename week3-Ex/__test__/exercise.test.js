import * as fn from '../js/exercise'

describe('Test callback Function', () => {
  test('Test fn: asyncFunc',  done => {
    // Arrange
    function callback(data) {
      // Assert
      expect(data).toBe('data');
      done();
    }
    // Act
    fn.fetchData(callback);
  });
})