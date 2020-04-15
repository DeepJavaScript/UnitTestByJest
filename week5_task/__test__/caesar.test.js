import caesar from '../js/caesar'

test('A use caesar 1 to be B',()=>{
  expect(caesar('A',1)).toBe('B2020-xx-xx')
})

test('B use caesar 1 to be C',()=>{
  expect(caesar('B',1)).toBe('C2020-xx-xx')
})