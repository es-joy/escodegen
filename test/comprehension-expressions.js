import { getRunTest } from './utils.js';

const data = {
    'Comprehension expressions': {
        '(for (i of [\n        1,\n        2,\n        3\n    ]) i * 1);': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'GeneratorExpression',
                        blocks: [
                            {
                                type: 'ComprehensionBlock',
                                left: {
                                    type: 'Identifier',
                                    name: 'i'
                                },
                                right: {
                                    type: 'ArrayExpression',
                                    elements: [
                                        {
                                            type: 'Literal',
                                            value: 1
                                        },
                                        {
                                            type: 'Literal',
                                            value: 2
                                        },
                                        {
                                            type: 'Literal',
                                            value: 3
                                        }
                                    ]
                                },
                                each: false,
                                of: true
                            }
                        ],
                        body: {
                            type: 'BinaryExpression',
                            operator: '*',
                            left: {
                                type: 'Identifier',
                                name: 'i',
                                range: [
                                    0,
                                    1
                                ]
                            },
                            right: {
                                type: 'Literal',
                                value: 1,
                                raw: '1',
                                range: [
                                    2,
                                    3
                                ]
                            }
                        }
                    }
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
});

describe('comprehension expression tests', function () {
    Object.keys(data).forEach(function (category) {
        it(category, function () {
            Object.keys(data[category]).forEach(function (source) {
                const expected = data[category][source];
                runTest(source, expected);
            });
        });
    });
});
