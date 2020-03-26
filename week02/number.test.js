const int = 1
const float = .2 + .1
test('1', () => {
  expect(int).toBeGreaterThan(0)
  expect(int).toBeGreaterThanOrEqual(1)
  expect(int).toBeLessThan(2)
  expect(int).toBeLessThanOrEqual(1)
  expect(int).toBe(1)
  expect(int).toEqual(1)
})
test('float', () => {
  // expect(float).toBe(.3)
  expect(float).toBeCloseTo(.3)
})