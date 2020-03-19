const sumOfPolynominal = require('./t4-module')


describe('輸入正整數 n 算出 1+2-3+4-5+6...n 的總和', function () {
    it('input:0 equalTo 0', function () {
        let case0 = sumOfPolynominal(0);
        expect(case0.sum).toBe(0);
    })
    it('input:9 equalTo -3', function () {
        let case1 = sumOfPolynominal(9);
        expect(case1.sum).toBe(-3);
    })
    it('input:3 equalTo 0', function () {
        let case2 = sumOfPolynominal(3);
        expect(case2.sum).toBe(0);
    })
    it('input:4 equalTo 4', function () {
        let case3 = sumOfPolynominal(4);
        expect(case3.sum).toBe(4);
    })
    it('input:5 equalTo -1', function () {
        let case4 = sumOfPolynominal(5);
        expect(case4.sum).toBe(-1);
    })
})//deacribe