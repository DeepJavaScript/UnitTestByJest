beforeEach(() => {
  console.log("beforeEach");
});

afterEach(() => {
  console.log("afterEach");
});

test('city database has Vienna', () => {
  console.log("Vienna");
});

test('city database has San Juan', () => {
  console.log("San Juan");
});

// "beforeEach"
// "Vienna"
// "afterEach"
// "beforeEach"
// "San Juan"
// "afterEach"