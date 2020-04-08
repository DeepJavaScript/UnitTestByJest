beforeAll(() => {
  console.log("beforeAll");
});

afterAll(() => {
  console.log("afterAll");
});

test('city database has Vienna', () => {
  // expect('Vienna').toBeTruthy();
  console.log("Vienna");
});

test('city database has San Juan', () => {
  // expect('San Juan').toBeTruthy();
  console.log("San Juan");
});

// "beforeAll"
// "Vienna"
// "San Juan"
// "afterAll"