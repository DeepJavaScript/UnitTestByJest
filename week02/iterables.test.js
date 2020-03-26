const nums = [1, 2, 3]
test('num in the nums', () => {
  expect(nums.values()).toContain(1)
  // expect(nums.values()).toEqual([1, 2, 3]) //fail
  expect([...nums.values()]).toEqual([1, 2, 3])
})