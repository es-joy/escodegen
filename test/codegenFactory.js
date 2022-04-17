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
    },
    'Codegen with jsdoc on expression': {
        'var hi = /** @type {something} */ function () {\n};': {
            generateFrom: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'hi',
                        range: [4, 6],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    init: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        jsdoc: {
                            type: 'JsdocBlock',
                            testingOnly: '/** @type {something} */ '
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [20, 31],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 31 }
                            }
                        },
                        range: [9, 31],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    range: [4, 31],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 31 }
                    }
                }],
                kind: 'var',
                range: [0, 32],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 32 }
                }
            }
        }
    },
    'Codegen with jsdoc on statement': {
        '/** @type {hello} */ function a() {\n}': {
            generateFrom: {
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a',
                    range: [9, 13],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 13 }
                    }
                },
                jsdoc: {
                    type: 'JsdocBlock',
                    testingOnly: '/** @type {hello} */ '
                },
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [16, 19],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 19 }
                    }
                },
                range: [0, 19],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 19 }
                }
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

        CodeGenerator.Statement.JsdocBlock =
            CodeGenerator.prototype.JsdocBlock = (stmt) => {
                return stmt.testingOnly;
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
