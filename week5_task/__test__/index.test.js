import index from '../js/index'

test("0  to the power 0",()=>{
    expect(index(0,0)).toBe(1)
})

test("cube root 0f 8 is 2",()=>{
    expect(index(8,1/3)).toBe(2)
})