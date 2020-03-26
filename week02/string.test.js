test('there is no I in team', () => {
  expect('team').not.toMatch(/I/)
})

test('w in water', () => {
  expect('water').toContain('w')
})