const testObject = require('../js/matcher');

//測試物件內的值`toEqual`
describe('week_02_matcher', () => {
  it('這個物件內有這些值：', () => {
    expect(testObject).toEqual({
      name: 'kevin',
      gender: 'male'
    });
  });
});

