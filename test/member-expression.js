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
    'Member expression (octal)':  {
        '(02).valueOf();': {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Literal',
                                value: 2,
                                raw: '02',
                                range: [
                                    1,
                                    3
                                ]
                            },
                            property: {
                                type: 'Identifier',
                                name: 'valueOf',
                                range: [
                                    5,
                                    12
                                ]
                            },
                            range: [
                                0,
                                12
                            ]
                        },
                        arguments: [],
                        range: [
                            0,
                            14
                        ]
                    },
                    range: [
                        0,
                        15
                    ]
                }
            ],
            sourceType: 'script',
            range: [
                0,
                15
            ],
            tokens: [
                {
                    type: 'Punctuator',
                    value: '(',
                    range: [
                        0,
                        1
                    ]
                },
                {
                    type: 'Numeric',
                    value: '02',
                    range: [
                        1,
                        3
                    ]
                },
                {
                    type: 'Punctuator',
                    value: ')',
                    range: [
                        3,
                        4
                    ]
                },
                {
                    type: 'Punctuator',
                    value: '.',
                    range: [
                        4,
                        5
                    ]
                },
                {
                    type: 'Identifier',
                    value: 'valueOf',
                    range: [
                        5,
                        12
                    ]
                },
                {
                    type: 'Punctuator',
                    value: '(',
                    range: [
                        12,
                        13
                    ]
                },
                {
                    type: 'Punctuator',
                    value: ')',
                    range: [
                        13,
                        14
                    ]
                },
                {
                    type: 'Punctuator',
                    value: ';',
                    range: [
                        14,
                        15
                    ]
                }
            ]
        }
    }
};

function test(code, result) {
    let options = {
        range: true,
        loc: false,
        tokens: true,
        raw: true
    };

    const tree = esprima.parse(code, options);

    options = {
        comment: true,
        sourceCode: code,
        format: {
            preserveBlankLines: true
        },
        parse (raw) {
            return {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 2
                        }
                    }
                ]
            };
        }
    };

    const expected = generate(result, options);

    // for UNIX text comment
    const actual = escodegen.generate(tree, options);
    expect(actual).to.be.equal(expected);
}

describe('Member expression', function () {
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
