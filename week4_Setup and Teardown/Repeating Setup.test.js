beforeEach(() => {
  console.log("beforeEach");
});

afterEach(() => {
  console.log("afterEach");
});

test('city database has Vienna', () => {
  // expect("Vienna").toBeTruthy();
  console.log("Vienna");
});

test('city database has San Juan', () => {
  // expect("San Juan").toBeTruthy();
  console.log("San Juan");
});

// "beforeEach"
// "Vienna"
// "afterEach"
// "beforeEach"
// "San Juan"
// "afterEach"