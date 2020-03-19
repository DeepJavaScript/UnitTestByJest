const testObject = require('../js/Object');

//測試物件內的值`toEqual`
test('This object contains', () => {
  expect(testObject).toEqual({
    name: 'kevin',
    gender: 'male'
  });
});