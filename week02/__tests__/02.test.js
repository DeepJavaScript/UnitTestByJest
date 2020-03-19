const { sum, obj, str, thowError } = require('../js/02');

// 測試 return number
describe('練習 Matchers', function() {
    it('two plus two is four', function() {
        const a = 2;
        const b = 2;
        const result = sum(a, b);
        expect(result).toBe(4);
    });
    // 測試 return object
    it('object assignment', function() {
        const a = { one: 1, two: 2 };
        const result = obj(a)
        expect(result).toEqual({ one: 1, two: 2 });
    });

    it('there is no I in hello', () => {
        const a = "hello";
        const result = str(a);
        expect(result).not.toMatch(`I`);
    });

    it('compiling android goes as expected', () => {
        expect(thowError).toThrow('you are using the wrong JDK');

    });

});