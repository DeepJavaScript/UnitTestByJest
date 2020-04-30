describe('Property Matchers', () => {
  // it('will fail every time', () => {
  //   const user = {
  //     name: 'Titan',
  //     createdAt: new Date(),
  //     id: Math.floor(Math.random() * 20)
  //   };

  //   console.log(user);
  
  //   expect(user).toMatchSnapshot();
  // });

  it('will check the matchers and pass', () => {
    const user = {
      name: 'Titan',
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20)
    };

    console.log(user);
  
    expect(user).toMatchSnapshot({
      name: 'Titan',
      createdAt: expect.any(Date),
      id: expect.any(Number),
    });
  });

  it('will check the values and pass', () => {
    const user = {
      name: 'Titan',
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20)
    };

    console.log(user);
  
    expect(user).toMatchSnapshot({
      name: 'Titan',
      createdAt: expect.any(Date),
      id: expect.any(Number),
    });
  });
});