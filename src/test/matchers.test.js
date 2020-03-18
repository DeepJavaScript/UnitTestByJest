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
});
