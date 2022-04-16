import { getRunTest } from './utils.js';
import escodegen from './loader.js';

const data = {
    'Codegen factory option': {
        '((some value))': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'CustomStatement',
                    customValue: 'some value'
                }]
            }
        }
    }
};

const runTest = getRunTest(null, {
    // comment: false,
    ranges: false,
    locations: false,
    ecmaVersion: 2020
}, {
    codegenFactory: () => {
        const { CodeGenerator } = escodegen;
        CodeGenerator.Statement.CustomStatement =
            CodeGenerator.prototype.CustomStatement = (stmt) => {
                return `((${stmt.customValue}))`;
            };

        return new CodeGenerator();
    }
});

describe('Codegen factory tests', function () {
    Object.keys(data).forEach(function (category) {
        it(category, function () {
            Object.keys(data[category]).forEach(function (source) {
                const expected = data[category][source];
                runTest(source, expected);
            });
        });
    });
});
