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

// function forEach(items, callback) {
//   for (let index = 0; index < items.length; index++) {
//     callback(items[index]);
//   }
// }

// const mockCallback = jest.fn(x => 42 + x);
// forEach([0, 1], mockCallback);
// console.log(mockCallback.mock.calls)
// console.log(mockCallback.mock.results)



let mockReturnFn = jest.fn()
mockReturnFn
.mockReturnValue(null)
.mockReturnValueOnce(false)
.mockReturnValueOnce(true)
console.log(mockReturnFn(),mockReturnFn(),mockReturnFn())