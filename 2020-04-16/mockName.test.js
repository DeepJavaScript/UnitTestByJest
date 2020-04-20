test('mock name', () => {
  const myMockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockImplementation(scalar => 42 + scalar);
  
  expect(myMockFn.getMockName()).toMatch("jest.fn()");
  
  myMockFn.mockName('add42');
  expect(myMockFn.getMockName()).toMatch("add42");
});