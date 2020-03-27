const trigger = require('../js/trigger');

beforeEach(() => {
  trigger("beforeEach outside");
});

afterEach(() => {
  trigger("afterEach outside");
});

beforeAll(() => {
  trigger("beforeAll outside");
});

afterAll(() => {
  trigger("afterAll outside");
});


test('test sommething', () => {
  console.log('test something outside')
  expect(true).toBe(true);
});

describe('matching in describe scope', () => {

  trigger("I want to do someting in describe scope");

  beforeEach(() => {
    trigger("beforeEach inside");
  });
  
  afterEach(() => {
    trigger("afterEach inside");
  });
  
  beforeAll(() => {
    trigger("beforeAll inside");
  });
  
  afterAll(() => {
    trigger("afterAll inside");
  });

  test('test sommething inside', () => {
    console.log('test sommething inside')
    expect(true).toBe(true);
  });
})
