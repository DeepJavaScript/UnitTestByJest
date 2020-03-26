test('null', () => {
  expect(null).toBeNull()
  expect(null).toBeDefined()
  expect(null).not.toBeUndefined()
  expect(null).not.toBeTruthy()
  expect(null).toBeFalsy()
})

test('0', () => {
  expect(0).not.toBeNull()
  expect(0).not.toBeTruthy()
  expect(0).not.toBeUndefined()
  expect(0).toBeDefined()
  expect(0).toBeFalsy()
})