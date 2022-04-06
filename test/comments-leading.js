/*
 Copyright (C) 2011-2013 Yusuke Suzuki <utatane.tea@gmail.com>
 Copyright (C) 2014 Kevin Barabash <kevinb7@gmail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import esprima from 'esprima';
import escodegen from './loader.js';
import { generate } from '../src/escodegen-node.js';

const data = {
    'Leading comments': {
        [`
            /* comment 1 *//* comment 3 */
            var a = 5;
        `]: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'a',
                                range: [
                                    60,
                                    61
                                ]
                            },
                            init: {
                                type: 'Literal',
                                value: 5,
                                raw: '5',
                                range: [
                                    64,
                                    65
                                ]
                            },
                            range: [
                                60,
                                65
                            ]
                        }
                    ],
                    kind: 'var',
                    range: [
                        56,
                        66
                    ]
                }
            ],
            sourceType: 'script',
            range: [
                56,
                66
            ],
            comments: [
                {
                    type: 'Block',
                    value: ' comment 1 ',
                    range: [
                        13,
                        28
                    ]
                },
                {
                    type: 'Block',
                    value: ' comment 3 ',
                    range: [
                        28,
                        43
                    ]
                }
            ],
            tokens: [
                {
                    type: 'Keyword',
                    value: 'var',
                    range: [
                        56,
                        59
                    ]
                },
                {
                    type: 'Identifier',
                    value: 'a',
                    range: [
                        60,
                        61
                    ]
                },
                {
                    type: 'Punctuator',
                    value: '=',
                    range: [
                        62,
                        63
                    ]
                },
                {
                    type: 'Numeric',
                    value: '5',
                    range: [
                        64,
                        65
                    ]
                },
                {
                    type: 'Punctuator',
                    value: ';',
                    range: [
                        65,
                        66
                    ]
                }
            ],
            leadingComments: [
                {
                    type: 'Block',
                    value: ' comment 1 ',
                    range: {
                        0: 13,
                        1: 28
                    },
                    extendedRange: [
                        13,
                        56
                    ]
                },
                {
                    type: 'Block',
                    value: ' comment 3 ',
                    range: {
                        0: 28,
                        1: 43
                    },
                    extendedRange: [
                        28,
                        56
                    ]
                }
            ]
        },
        [`
            /* comment 1 *//* comment 3 */ var a = 5;
        `]: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'a',
                                range: [
                                    48,
                                    49
                                ]
                            },
                            init: {
                                type: 'Literal',
                                value: 5,
                                raw: '5',
                                range: [
                                    52,
                                    53
                                ]
                            },
                            range: [
                                48,
                                53
                            ]
                        }
                    ],
                    kind: 'var',
                    range: [
                        44,
                        54
                    ]
                }
            ],
            sourceType: 'script',
            range: [
                44,
                54
            ],
            comments: [
                {
                    type: 'Block',
                    value: ' comment 1 ',
                    range: [
                        13,
                        28
                    ]
                },
                {
                    type: 'Block',
                    value: ' comment 3 ',
                    range: [
                        28,
                        43
                    ]
                }
            ],
            tokens: [
                {
                    type: 'Keyword',
                    value: 'var',
                    range: [
                        44,
                        47
                    ]
                },
                {
                    type: 'Identifier',
                    value: 'a',
                    range: [
                        48,
                        49
                    ]
                },
                {
                    type: 'Punctuator',
                    value: '=',
                    range: [
                        50,
                        51
                    ]
                },
                {
                    type: 'Numeric',
                    value: '5',
                    range: [
                        52,
                        53
                    ]
                },
                {
                    type: 'Punctuator',
                    value: ';',
                    range: [
                        53,
                        54
                    ]
                }
            ],
            leadingComments: [
                {
                    type: 'Block',
                    value: ' comment 1 ',
                    range: {
                        0: 13,
                        1: 28
                    },
                    extendedRange: [
                        13,
                        44
                    ]
                },
                {
                    type: 'Block',
                    value: ' comment 3 ',
                    range: {
                        0: 28,
                        1: 43
                    },
                    extendedRange: [
                        28,
                        44
                    ]
                }
            ]
        }
    },
};

function test(code, result) {
    let options = {
        range: true,
        tokens: true,
        comment: true
    };

    let tree = esprima.parse(code, options);
    tree = escodegen.attachComments(tree, tree.comments, tree.tokens);

    options = {
        comment: true,
        sourceCode: code,
        format: {
            preserveBlankLines: true
        }
    };

    const expected = generate(result, options);

    // for UNIX text comment
    const actual = escodegen.generate(tree, options);
    expect(actual).to.be.equal(expected);
}

describe('Leading comments', function () {
    Object.keys(data).forEach(function (category) {
        it(category, function () {
            Object.keys(data[category]).forEach(function (source) {
                const expected = data[category][source];
                test(source, expected);
            });
        });
    });
});

/* vim: set sw=4 ts=4 et tw=80 : */
