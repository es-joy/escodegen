import escodegen from './loader.js';

// Special handling for regular expression literal since we need to
// convert it to a string literal, otherwise it will be decoded
// as object "{}" and the regular expression would be lost.
function adjustRegexLiteral(key, value) {
    if (key === 'value' && value instanceof RegExp) {
        value = value.toString();
    }
    return value;
}

function getRunTest (parser, identityOptions) {
    function testIdentity(code, syntax) {
        let actual, actual2, expected;
        const generateOptions = {
            format: { semicolons: false }
        };
        expect(function () {
            let tree = parser.parse(code, identityOptions);
            expected = JSON.stringify(tree, adjustRegexLiteral, 4);
            tree = parser.parse(escodegen.generate(tree, generateOptions), identityOptions);
            actual = JSON.stringify(tree, adjustRegexLiteral, 4);
            tree = parser.parse(escodegen.generate(syntax, generateOptions), identityOptions);
            actual2 = JSON.stringify(tree, adjustRegexLiteral, 4);
        }).not.to.be.throw();
        expect(actual).to.be.equal(expected);
        expect(actual2).to.be.equal(expected);
    }

    function testGenerate(expected, result) {
        const options = {
            indent: '    ',
            parse: parser.parse
        };

        let actual;
        expect(function () {
            actual = escodegen.generate(result.generateFrom, options);
        }).not.to.be.throw();
        expect(actual).to.be.equal(expected);
    }

    return function runTest(code, result) {
        if (Object.prototype.hasOwnProperty.call(result, 'generateFrom')) {
            testGenerate(code, result);
        } else {
            testIdentity(code, result);
        }
    };
}

export { getRunTest };
