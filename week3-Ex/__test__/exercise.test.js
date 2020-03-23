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

  test('Test Promise', () => {
    // Act
    return fn.promiseObj()
      .then(data => {
        //Assert
        expect(data).toBe('Time\'s up!');
      });
  });

  test('Test Promise: use resolves', () => {
    // Arrange
    let promise;
    // Act
    promise = fn.promiseObj();
    //Assert
    return expect(promise).resolves.toBe('Time\'s up!');
  });
})