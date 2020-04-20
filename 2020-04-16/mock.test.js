test('what is mock', () => {
  const myMock = jest.fn();

  const a = new myMock();
  const b = {
    name: "b"
  };
  const bound = myMock.bind(b);
  bound();

  console.log(myMock.mock.instances.constructor.name, "\n", JSON.stringify(myMock.mock.instances));
  // > [ <a>, <b> ]

  expect(true).toBeTruthy();
});

test('mock object of mock function as call mockFunction', () => {
  const someMockFunction = jest.fn(() => 'return value');
  someMockFunction('first arg', 'second arg');

  // The function was called exactly once
  expect(someMockFunction.mock.calls.length).toBe(1);
  
  // The first arg of the first call to the function was 'first arg'
  expect(someMockFunction.mock.calls[0][0]).toBe('first arg');
  
  // The second arg of the first call to the function was 'second arg'
  expect(someMockFunction.mock.calls[0][1]).toBe('second arg');
  
  // The return value of the first call to the function was 'return value'
  expect(someMockFunction.mock.results[0].value).toBe('return value');
});
  
test('mock object of mock function as new mockFunction', () => {
  const someMockFunction = jest.fn();
  const a = new someMockFunction();
  a.name = 'test';
  const b = new someMockFunction();  

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toEqual('test');
});


test('test jest.fn()', () => {
  const myMockFn = jest.fn(callback => callback(null, true));

  myMockFn((err, val) => console.log(val));  // 印出 true
  // > true

  expect(myMockFn.mock.calls[0][0]).toBeInstanceOf(Function);
});