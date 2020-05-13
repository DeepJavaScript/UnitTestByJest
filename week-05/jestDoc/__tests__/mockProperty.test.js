it('mock property', () => {
  const fooMockFunction = jest
    .fn(function (x, y) {
      let tmp = this.x || 0;
      return tmp + x + y;
    });

  const a = new fooMockFunction('first arg', 'second arg');
  console.log(a);    // mockConstructor {}
  console.log(a.x);  // undefined
  
  const b = {x: 10};
  const bound = fooMockFunction.bind(b, 3, 4);
  console.log(bound());  // 17

  console.log(fooMockFunction.mock);
  // {
  //   calls: [ [ 1, 2 ], [ 3, 4 ] ],
  //   instances: [ mockConstructor {}, { x: 10 } ],
  //   invocationCallOrder: [ 1, 2 ],
  //   results: [
  //     { type: 'return', value: 3; },
  //     { type: 'return', value: 17 }
  //   ]
  // }

  console.log(fooMockFunction.mock.instances[0]);  // mockConstructor {}
  console.log(fooMockFunction.mock.instances[1]);  // { x: 10 }

  // 呼叫幾次
  expect(fooMockFunction.mock.calls.length).toBe(2);

  // 第幾次呼叫的第幾個 arg
  expect(fooMockFunction.mock.calls[0][0]).toBe('first arg');
  expect(fooMockFunction.mock.calls[0][1]).toBe('second arg');
  expect(fooMockFunction.mock.calls[1][0]).toBe(3);
  expect(fooMockFunction.mock.calls[1][1]).toBe(4);

  // 第幾次呼叫的回傳值
  expect(fooMockFunction.mock.results[1].value).toBe(17);

  // 此 mock 函數被實例化的次數
  expect(fooMockFunction.mock.instances.length).toBe(2);

  // 第幾個 instance 的 property 的值
  expect(fooMockFunction.mock.instances[1].x).toBe(10);
});