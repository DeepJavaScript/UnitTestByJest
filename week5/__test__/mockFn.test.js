let mockFn = jest.fn()

// mock function 無定義時為 undefined
it('mockFn is undefined',()=>{
  expect(mockFn()).toBe(undefined)
})

let mockFnHaveDefault = jest.fn(()=>true)

it('mockFnHaveDefault is true',()=>{
  expect(mockFnHaveDefault()).toBe(true)
})

describe('set mock value',()=>{
  beforeAll(() => {
    mockFn
    .mockImplementation(()=>null)
    .mockImplementationOnce(()=>true)
    .mockImplementationOnce(()=>false)
  });
  // true false null
  it("test mockImplementationOnce value",()=>{
    console.log(mockFn(),mockFn(),mockFn())
  })
})