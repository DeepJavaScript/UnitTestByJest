const code = () => '123.123'.toFixed(2)


test('code will throw an error', () => {
  // code() TypeError: "123.123".toFixed is not a function
  expect(code).toThrow()
  expect(code).toThrow(TypeError)
  expect(code).toThrow('not a function')
  expect(code).toThrow(/\.toFixed/)
})