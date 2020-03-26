const obj = {}
test('2+2=4', () => {
  expect(2 + 2).toBe(4)
})
test('obj variables with literals', () => {
  expect(obj).toEqual({})
})
test('logic not', () => {
  expect(1).not.toBe(2)
})