import { forEach } from '../week5_Mock Functions/forEach';

it('使用 mock 函式', () => {
  const mockCallback = jest.fn(x => 42 + x); // 取代 DOC
  forEach([0, 1], mockCallback);

  console.log("mockCallback", mockCallback);

  expect(mockCallback.mock.calls.length).toBe(2);
  // 此 mock 函式被調用了兩次

  expect(mockCallback.mock.calls[0][0]).toBe(0);
  // 第一次調用函式時的第一個參數是 0

  expect(mockCallback.mock.calls[1][0]).toBe(1);
  // 第二次調用函式時的第一個參數是 1

  expect(mockCallback.mock.results[0].value).toBe(42);
  // 第一次函式調用的返回值是 42

  console.log("mockCallback.mock", mockCallback.mock);
});

/*
{
  calls: [ [ 0 ], [ 1 ] ],
  instances: [ undefined, undefined ],
  invocationCallOrder: [ 1, 2 ],
  results: [ { type: 'return', value: 42 }, { type: 'return', value: 43 } ]
}
*/

/*
{
  mockCallback.mock { calls: [], instances: [], invocationCallOrder: [], results: [] }
}
*/