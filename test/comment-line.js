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

// import esprima from 'esprima';
import { generate } from '../src/escodegen-node.js';

const data = {
    'Line comments': {
        '// abc\u2029': {
            type: 'Program',
            body: [],
            sourceType: 'script',
            range: [ 7, 7 ],
            tokens: [],
            comments: [{
                range: [0, 7],
                type: 'Line',
                value: ' abc\u2029'
            }],
            leadingComments: [{
                type: 'Line',
                value: ' abc\u2029',
                range: [{
                    0: 0,
                    1: 7
                }],
                extendedRange: [0, 7]
            }]
        }
    },
};

function test(code, result) {
    let options = {
        range: true,
        tokens: true,
        comment: true
    };

    // This isn't actually generatable by Esprima apparently, so
    //  we only check the
    // let tree = esprima.parse(code, options);
    // tree = attachComments(tree, tree.comments, tree.tokens);

    options = {
        comment: true,
        sourceCode: code
    };

    const expected = generate(result, options);

    // for UNIX text comment
    // const actual = generate(tree, options);
    expect(code).to.be.equal(expected);
}

describe('Line comments', function () {
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
