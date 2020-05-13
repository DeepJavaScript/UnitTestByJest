describe('mock 名稱', () => {
  it('設定 mock 名稱', () => {
    const myMockFn = jest.fn()
      .mockImplementation(scalar => 42 + scalar)
      .mockName('add42');

    myMockFn(10);
    myMockFn(10);
    myMockFn(10);

    expect(myMockFn).toBeCalledTimes(3);
    expect(myMockFn).toReturnWith(52);
  });
});