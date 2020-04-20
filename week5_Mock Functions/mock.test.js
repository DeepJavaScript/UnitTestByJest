
it('mock 屬性', () => {
  const myMock = jest.fn();

  const a = new myMock();
  a.name = "jest"
  const b = { name: "test" };
  const bound = myMock.bind(b);
  bound();

  console.log(myMock.mock.instances);
  // [ mockConstructor { name: 'jest' }, { name: 'test' } ]

  expect(myMock.mock.instances.length).toBe(2); // invocationCallOrder: [ 1, 2 ]
  // 該函式被實例化了兩次

  expect(myMock.mock.instances[1].name).toEqual('test');
  // 該函式的第二個實例化返回的對象，具有一個 “name” 屬性，其值設置為 “test”
});

it('模擬返回值', () => {
  const myMock = jest.fn();
  console.log(myMock()); // invocationCallOrder: [ 3 ]
  // > undefined，目前未設定任何返回值

  myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
  // 進行預設回傳值

  console.log(myMock(), myMock(), myMock(), myMock()); // invocationCallOrder: [ 4, 5 , 6, 7 ]
  // > 10, 'x', true, true
});


it.only('將值直接注入到測試中', () => {
  const filterTestFn = jest.fn();

  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
  // 設定第一次調用時回傳 true，第二次調用時回傳 false。

  const result = [11, 12].filter(num => filterTestFn(num)); // invocationCallOrder: [ 8, 9 ]

  console.log(result); // > [11]
  console.log(filterTestFn.mock);
});

// {
//   calls: [ [ 11 ], [ 12 ] ],
//   instances: [ undefined, undefined ],
//   invocationCallOrder: [ 1, 2 ],
//   results: [ { type: 'return', value: true }, { type: 'return', value: false } ]
// }