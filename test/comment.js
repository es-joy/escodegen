/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>

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

import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import * as esprima from './3rdparty/esprima-harmony.original.js';
import escodegen from './loader.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function test(code, expected) {
    const options = {
        comment: true,
        range: true,
        loc: false,
        tokens: true,
        raw: false
    };

    let tree = esprima.parse(code, options);
    tree = escodegen.attachComments(tree, tree.comments, tree.tokens);

    // for UNIX text comment
    const actual = `${escodegen.generate(tree, {
        comment: true,
        format: {
            indent: {
                adjustMultilineComment: true
            }
        }
    }).replace(/[\n\r]$/, '')}\n`;
    expect(actual).to.be.equal(expected);
}

describe('comment test', function () {
    fs.readdirSync(`${__dirname}/comment`).sort().forEach(function(file) {
        if (/\.js$/.test(file) && !/expected\.js$/.test(file)) {
            it(file, function () {
                const p = file.replace(/\.js$/, '.expected.js');
                const code = fs.readFileSync(`${__dirname}/comment/${file}`, 'utf-8');
                const expected = fs.readFileSync(`${__dirname}/comment/${p}`, 'utf-8');
                test(code, expected);
            });
        }
    });
});
/* vim: set sw=4 ts=4 et tw=80 : */
