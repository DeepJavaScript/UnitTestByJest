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
    promise = fn.promiseObj(); // get promise object.
    //Assert
    return expect(promise).resolves.toBe('Time\'s up!');
  });

  test('Test Promise: use async, await', async () => {
    // Arrange
    let promise;
    // Act
    promise = fn.promiseObj(); // get promise object.
    
    //Assert
    await expect(promise).resolves.toBe('Time\'s up!');
  });
})