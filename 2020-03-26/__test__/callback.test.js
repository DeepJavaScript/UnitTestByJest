const { fetchData } = require('./../js/fetchData.js');

test(`callback: it's a sync function`, () => {

  function callback(data) {
    console.log(`---callback Start---`);
    expect(data).toBe('peanut butter');
    console.log(`---callback End---`);

  }
  fetchData(callback, 'sync');
});

test(`callback: it's a async function`, done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  console.log(`--- TryCatch Start---`);
  fetchData(callback, 'async');
  console.log(`--- TryCatch End---`);
});