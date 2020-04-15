import index from '../js/index'

test("2 to the third power is 8",()=>{
  expect(index(2,3)).toBe(8)
})


test("5 to the third power is 10",()=>{
  expect(index(5,10)).toBe(9765625)
})