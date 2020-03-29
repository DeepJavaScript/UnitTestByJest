describe('matchers', () => {
  describe('Number Equality', () => {
    it('測試整數相等：', () => {
      let a = 4;
      let b = 7;
      expect(a + b).toBe(11);
    })
    it('測試浮點數相等：', () => {
      let a = 0.1;
      let b = 0.2;
      expect(a + b).toBeCloseTo(0.3);
    })
  })
  it('測試物件內的值：', () => {
    const membeDdata = {
      name: 'Jinwen'
    };
    membeDdata.gender = 'female'
    expect(membeDdata).toEqual({
      name: 'Jinwen',
      gender: 'female'
    });
  });
  it('測試不相等值：', () => {
    let a = 3;
    let b = 10;
    expect((a + b) % 2).not.toBe(0);
  })
  describe('Truthiness', () => {
    it('測試是 null 值：', () => {
      const a = null;
      expect(a).toBeNull();
    })
    it('測試是 defined 的值：', () => {
      const a = null;
      expect(a).toBeDefined();
    })
    it('測試是 undefined 值：', () => {
      let a;
      expect(a).toBeUndefined();
    })
    it('測試為 true', () => {
      let a = 1;
      let b = true;
      expect(a = b).toBeTruthy();
    })
    it('測試為 false', () => {
      let a = null;
      expect(a).toBeFalsy();
    })
  })
  describe('Number Comparison', () => {
    it('測試大於：', () => {
      const a = 4;
      const b = 17;
      expect(a + b).toBeGreaterThan(20);
    })
    it('測試大於等於：', () => {
      const memberData = {};
      memberData.age1 = 28;
      memberData.age2 = 25;
      expect(memberData.age1).toBeGreaterThanOrEqual(25);
      expect(memberData.age2).toBeGreaterThanOrEqual(25);
    })
  })
  describe('String Proofread', () => {
    it('測試是否有該 string：', () => {
      const name = 'Jinwen Shieh';
      expect(name).toMatch(/J/);
      expect(name).not.toMatch(/a/);
    })
  })
  describe('Arrays and iterables', () => {
    it('測試陣列中是否有該值：', () => {
      const yummyFood = [
        'choclate cake',
        'pudding',
        'ice cream',
        'fried chicken'
      ]
      expect(yummyFood).toContain('ice cream');
    })
  })
  describe('Exceptions：', () => {
    function throwError() {
      throw new Error('You havr the wrong password.');
    }
    it('測試 Error 訊息：', () => {
      expect(throwError).toThrow()
      expect(throwError).toThrow(Error);
      expect(throwError).toThrow('You havr the wrong password.');
      expect(throwError).toThrow(/wrong/);
    })
  })
});

