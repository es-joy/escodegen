import escodegen from './loader.js';

describe('Errors', function () {
    it('throws with bad type', function () {
        expect(() => {
            escodegen.generate({
                type: 'BadType'
            });
        }).to.throw('Unknown node type: BadType');
    });

    it('throws with NaN', function () {
        expect(() => {
            escodegen.generate({
                // Shouldn't get this as a literal, but is needed to
                //  produce the error
                type: 'Literal',
                value: NaN
            });
        }).to.throw('Numeric literal whose value is NaN');
    });

    it('throws with negative number values', function () {
        expect(() => {
            escodegen.generate({
                // Should get this instead with a separator negative unary
                //  operator as a literal, but is needed to produce
                //  the error
                type: 'Literal',
                value: -123
            });
        }).to.throw('Numeric literal whose value is negative');
    });
});
