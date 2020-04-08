beforeAll(() => {
  console.log("beforeAll");
});

afterAll(() => {
  console.log("afterAll");
});

test('city database has Vienna', () => {
  console.log("Vienna");
});

test('city database has San Juan', () => {
  console.log("San Juan");
});

// "beforeAll"
// "Vienna"
// "San Juan"
// "afterAll"