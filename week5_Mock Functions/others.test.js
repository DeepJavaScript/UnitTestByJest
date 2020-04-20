// it('模擬實作_返回 this', () => {
//   const myObj = {
//     myMethod: jest.fn().mockReturnThis(),
//   };

//   console.log("myObj", myObj.myMethod());

//   // is the same as

//   const otherObj = {
//     myMethod: jest.fn(function () {
//       return this;
//     }),
//   };
// });

// it('模擬名稱_自訂命名', () => {
//   const myMockFn = jest
//     .fn()
//     .mockReturnValue('default')
//     .mockImplementation(scalar => 42 + scalar)
//     .mockName('oraoraora'); // myMockFn jest.fn()
//   console.log("myMockFn", myMockFn.getMockName());
// });

it.only('自定義匹配器', () => {
  const x = 'hello';
  const myMockFn = jest
    .fn((x) => x + 'default')

  myMockFn(x);

  expect(myMockFn).toHaveBeenCalled();
  // The mock function was called at least once

  // expect(myMockFn).toMatchSnapshot();
  // All calls and the name of the mock is written as a snapshot

  expect(myMockFn).toHaveBeenCalledWith(x);
  // The mock function was called at least once with the specified args
});