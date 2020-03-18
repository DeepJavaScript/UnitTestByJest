describe('matchers', () => {
  describe('null', () => {
    it('Should pass toBeNull', () => {
      expect(null).toBeNull();
    });
    it('Should pass toBeDefined', () => {
      expect(null).toBeDefined();
    });
    it('Should pass toBeFalsy', () => {
      expect(null).toBeFalsy();
    });
    it('Should not pass toBeDefined', () => {
      expect(null).not.toBeUndefined();
    });
    it('Should not pass toBeTruthy', () => {
      expect(null).not.toBeTruthy();
    });
  });

  describe('integer operation', () => {
    it('Should pass toBe', () => {
      const value = 2 + 2;
      expect(value).toBe(4);
    });

    it('Should pass toEqual', () => {
      const value = 2 + 2;
      expect(value).toEqual(4);
    });
  });

  describe('float operation', () => {
    it('Would not pass toBe', () => {
      const value = 0.21 + 0.2;
      expect(value).not.toBe(0.41);
    });

    it('Would not pass toEqual', () => {
      const value = 0.21 + 0.2;
      expect(value).not.toEqual(0.41);
    });

    it('Should pass toBeCloseTo', () => {
      const value = 0.21 + 0.2;
      expect(value).toBeCloseTo(0.41);
    });
  });
});
