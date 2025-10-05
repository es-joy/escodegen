/*
  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2020 Apple Inc. All rights reserved.

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

import * as estraverse from '@es-joy/estraverse';
import * as esutils from 'esutils';

/** @type {typeof import('source-map').SourceNode} */
let SourceNode;

/** @type {string} */
let base;

/** @type {string} */
let indent;

/** @type {boolean} */
let json;

/** @type {boolean} */
let renumber;

/** @type {boolean} */
let hexadecimal;

/** @type {"double"|"single"|"auto"} */
let quotes;

/** @type {boolean} */
let escapeless;

// "\n"|""
/** @type {string} */
let newline;

// " "|""
/** @type {string} */
let space;

/** @type {boolean} */
let parentheses;

/** @type {boolean} */
let semicolons;

/** @type {boolean} */
let safeConcatenation;

/** @type {boolean} */
let directive;

/** @type {boolean} */
let preserveBlankLines;

/**
 * @type {{
 *   comment: boolean,
 *   raw: boolean,
 *   verbatim: null|string
 *   moz: {
 *     starlessGenerator: boolean,
 *     comprehensionExpressionStartsWithAssignment: boolean
 *   },
 *   format: {
 *     indent: {
 *       adjustMultilineComment: boolean
 *     }
 *   }
 * }}
 */
let extra;

/** @type {null|((s: string) => import('estree').Program)} */
let parse;

/** @type {null|boolean|string} */
let sourceMap;

/** @type {string|null} */
let sourceCode;

let codegenFactory;

const { Syntax } = estraverse;

/**
 * Generation is done by generateExpression.
 * @param {import('estree').Node} node
 */
function isExpression(node) {
    return Object.hasOwn(CodeGenerator.Expression, node.type);
}

/**
 * Generation is done by generateStatement.
 * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration} node
 */
function isStatement(node) {
    return Object.hasOwn(CodeGenerator.Statement, node.type);
}

const Precedence = {
    Sequence: 0,
    Yield: 1,
    Assignment: 1,
    Conditional: 2,
    ArrowFunction: 2,
    Coalesce: 3,
    LogicalOR: 4,
    LogicalAND: 5,
    BitwiseOR: 6,
    BitwiseXOR: 7,
    BitwiseAND: 8,
    Equality: 9,
    Relational: 10,
    BitwiseSHIFT: 11,
    Additive: 12,
    Multiplicative: 13,
    Exponentiation: 14,
    Await: 15,
    Unary: 15,
    Postfix: 16,
    OptionalChaining: 17,
    Call: 18,
    New: 19,
    TaggedTemplate: 20,
    Member: 21,
    Primary: 22
};

const BinaryPrecedence = {
    '??': Precedence.Coalesce,
    '||': Precedence.LogicalOR,
    '&&': Precedence.LogicalAND,
    '|': Precedence.BitwiseOR,
    '^': Precedence.BitwiseXOR,
    '&': Precedence.BitwiseAND,
    '==': Precedence.Equality,
    '!=': Precedence.Equality,
    '===': Precedence.Equality,
    '!==': Precedence.Equality,
    is: Precedence.Equality,
    isnt: Precedence.Equality,
    '<': Precedence.Relational,
    '>': Precedence.Relational,
    '<=': Precedence.Relational,
    '>=': Precedence.Relational,
    in: Precedence.Relational,
    instanceof: Precedence.Relational,
    '<<': Precedence.BitwiseSHIFT,
    '>>': Precedence.BitwiseSHIFT,
    '>>>': Precedence.BitwiseSHIFT,
    '+': Precedence.Additive,
    '-': Precedence.Additive,
    '*': Precedence.Multiplicative,
    '%': Precedence.Multiplicative,
    '/': Precedence.Multiplicative,
    '**': Precedence.Exponentiation
};

//Flags
const F_ALLOW_IN = 1,
    F_ALLOW_CALL = 1 << 1,
    F_ALLOW_UNPARATH_NEW = 1 << 2,
    F_FUNC_BODY = 1 << 3,
    F_DIRECTIVE_CTX = 1 << 4,
    F_SEMICOLON_OPT = 1 << 5,
    F_FOUND_COALESCE = 1 << 6;

//Expression flag sets
//NOTE: Flag order:
// F_ALLOW_IN
// F_ALLOW_CALL
// F_ALLOW_UNPARATH_NEW
const E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
    E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
    E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
    E_TFF = F_ALLOW_IN,
    E_FFT = F_ALLOW_UNPARATH_NEW,
    E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;

//Statement flag sets
//NOTE: Flag order:
// F_ALLOW_IN
// F_FUNC_BODY
// F_DIRECTIVE_CTX
// F_SEMICOLON_OPT
const S_TFFF = F_ALLOW_IN,
    S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
    S_FFFF = 0x00,
    S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
    S_TTFF = F_ALLOW_IN | F_FUNC_BODY;

function getDefaultOptions() {
    // default options
    return {
        file: undefined,
        sourceContent: undefined,
        indent: null,
        base: null,
        parse: null,
        comment: false,
        codegenFactory: () => new CodeGenerator(),
        format: {
            indent: {
                style: '    ',
                base: 0,
                adjustMultilineComment: false
            },
            newline: '\n',
            space: ' ',
            json: false,
            renumber: false,
            hexadecimal: false,
            quotes: /** @type {"single"|"double"|"auto"} */ ('single'),
            escapeless: false,
            compact: false,
            parentheses: true,
            semicolons: true,
            safeConcatenation: false,
            preserveBlankLines: false
        },
        moz: {
            comprehensionExpressionStartsWithAssignment: false,
            starlessGenerator: false
        },
        sourceMap: null,
        sourceMapRoot: null,
        sourceMapWithCode: false,
        directive: false,
        raw: true,
        verbatim: null,
        sourceCode: null
    };
}

/**
 * @param {string} str
 * @param {number} num
 */
function stringRepeat(str, num) {
    let result = '';

    for (num |= 0; num > 0; num >>>= 1, str += str) {
        if (num & 1) {
            result += str;
        }
    }

    return result;
}

/**
 * @param {string} str
 */
function hasLineTerminator(str) {
    return (/[\r\n]/g).test(str);
}

/**
 * @param {string} str
 */
function endsWithLineTerminator(str) {
    const len = str.length;
    return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
}

/**
 * @param {any} target
 * @param {any} override
 */
function updateDeeply(target, override) {
    /**
     * @param {any} target
     */
    function isHashObject(target) {
        return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
    }

    for (const [key, val] of Object.entries(override)) {
        if (isHashObject(val)) {
            if (isHashObject(target[key])) {
                updateDeeply(target[key], val);
            } else {
                target[key] = updateDeeply({}, val);
            }
        } else {
            target[key] = val;
        }
    }
    return target;
}

/**
 * @param {number} value
 */
function generateNumber(value) {
    if (value !== value) {
        throw new Error('Numeric literal whose value is NaN');
    }
    if (value < 0 || (value === 0 && 1 / value < 0)) {
        throw new Error('Numeric literal whose value is negative');
    }

    if (value === 1 / 0) {
        return json ? 'null' : renumber ? '1e400' : '1e+400';
    }

    let result = `${value}`;
    if (!renumber || result.length < 3) {
        return result;
    }

    let point = result.indexOf('.');
    if (!json && result.charCodeAt(0) === 0x30  /* 0 */ && point === 1) {
        point = 0;
        result = result.slice(1);
    }
    let temp = result;
    result = result.replace('e+', 'e');
    let exponent = 0;
    let pos;
    if ((pos = temp.indexOf('e')) > 0) {
        exponent = +temp.slice(pos + 1);
        temp = temp.slice(0, pos);
    }
    if (point >= 0) {
        exponent -= temp.length - point - 1;
        temp = `${+(temp.slice(0, point) + temp.slice(point + 1))}`;
    }
    pos = 0;
    while (temp.charCodeAt(temp.length + pos - 1) === 0x30  /* 0 */) {
        --pos;
    }
    if (pos !== 0) {
        exponent -= pos;
        temp = temp.slice(0, pos);
    }
    if (exponent !== 0) {
        temp += `e${exponent}`;
    }
    if ((temp.length < result.length ||
                    (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = `0x${value.toString(16)}`).length < result.length)) &&
                +temp === value) {
        result = temp;
    }

    return result;
}

/**
 * Generate valid RegExp expression.
 * This function is based on https://github.com/Constellation/iv Engine
 * @param {number} ch
 * @param {boolean} previousIsBackslash
 */
function escapeRegExpCharacter(ch, previousIsBackslash) {
    // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
    if ((ch & ~1) === 0x2028) {
        return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
    }
    if (ch === 10 || ch === 13) {  // \n, \r
        return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
    }
    return String.fromCharCode(ch);
}

/**
 * @param {RegExp} reg
 */
function generateRegExp(reg) {
    let result = reg.toString();

    if (reg.source) {
        // extract flag from toString result
        const match = result.match(/\/([^/]*)$/);
        if (!match) {
            return result;
        }

        const [, flags] = match;
        result = '';

        let characterInBrack = false;
        let previousIsBackslash = false;
        for (let i = 0, iz = reg.source.length; i < iz; ++i) {
            const ch = reg.source.charCodeAt(i);

            if (!previousIsBackslash) {
                if (characterInBrack) {
                    if (ch === 93) {  // ]
                        characterInBrack = false;
                    }
                } else {
                    if (ch === 47) {  // /
                        result += '\\';
                    } else if (ch === 91) {  // [
                        characterInBrack = true;
                    }
                }
                result += escapeRegExpCharacter(ch, previousIsBackslash);
                previousIsBackslash = ch === 92;  // \
            } else {
                // if new RegExp("\\\n') is provided, create /\n/
                result += escapeRegExpCharacter(ch, previousIsBackslash);
                // prevent like /\\[/]/
                previousIsBackslash = false;
            }
        }

        return `/${result}/${flags}`;
    }

    return result;
}

/**
 * @param {number} code
 * @param {number} next
 */
function escapeAllowedCharacter(code, next) {
    if (code === 0x08  /* \b */) {
        return '\\b';
    }

    if (code === 0x0C  /* \f */) {
        return '\\f';
    }

    if (code === 0x09  /* \t */) {
        return '\\t';
    }

    const hex = code.toString(16).toUpperCase();
    if (json || code > 0xFF) {
        return `\\u${'0000'.slice(hex.length)}${hex}`;
    } else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) {
        return '\\0';
    } else if (code === 0x000B  /* \v */) { // '\v'
        return '\\x0B';
    } else {
        return `\\x${'00'.slice(hex.length)}${hex}`;
    }
}

/**
 * @param {number} code
 */
function escapeDisallowedCharacter(code) {
    if (code === 0x5C  /* \ */) {
        return '\\\\';
    }

    if (code === 0x0A  /* \n */) {
        return '\\n';
    }

    if (code === 0x0D  /* \r */) {
        return '\\r';
    }

    if (code === 0x2028) {
        return '\\u2028';
    }

    if (code === 0x2029) {
        return '\\u2029';
    }
    /* c8 ignore next */
    throw new Error('Incorrectly classified character');
}

/**
 * @param {string} str
 */
function escapeDirective(str) {
    let quote = quotes === 'double' ? '"' : '\'';
    for (let i = 0, iz = str.length; i < iz; ++i) {
        const code = str.charCodeAt(i);
        if (code === 0x27  /* ' */) {
            quote = '"';
            break;
        } else if (code === 0x22  /* " */) {
            quote = '\'';
            break;
        } else if (code === 0x5C  /* \ */) {
            ++i;
        }
    }

    return quote + str + quote;
}

/**
 * @param {string} str
 */
function escapeString(str) {
    let result = '', singleQuotes = 0, doubleQuotes = 0;

    for (let i = 0, len = str.length; i < len; ++i) {
        const code = str.charCodeAt(i);
        if (code === 0x27  /* ' */) {
            ++singleQuotes;
        } else if (code === 0x22  /* " */) {
            ++doubleQuotes;
        } else if (code === 0x2F  /* / */ && json) {
            result += '\\';
        } else if (esutils.code.isLineTerminator(code) || code === 0x5C  /* \ */) {
            result += escapeDisallowedCharacter(code);
            continue;
        } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 0x20  /* SP */ || !json && !escapeless && (code < 0x20  /* SP */ || code > 0x7E  /* ~ */))) {
            result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
            continue;
        }
        result += String.fromCharCode(code);
    }

    const single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
    const quote = single ? '\'' : '"';

    if (!(single ? singleQuotes : doubleQuotes)) {
        return quote + result + quote;
    }

    str = result;
    result = quote;

    for (let i = 0, len = str.length; i < len; ++i) {
        const code = str.charCodeAt(i);
        if ((code === 0x27  /* ' */ && single) || (code === 0x22  /* " */ && !single)) {
            result += '\\';
        }
        result += String.fromCharCode(code);
    }

    return result + quote;
}

/**
 * flatten an array to a string, where the array can contain
 * either strings or nested arrays
 * @param {any[]} arr
 */
function flattenToString(arr) {
    let result = '';
    for (const elem of arr) {
        result += Array.isArray(elem) ? flattenToString(elem) : elem;
    }
    return result;
}

/**
 * convert generated to a SourceNode when source maps are enabled.
 * @param {(
 *   string | import('source-map').SourceNode | NestedStringArray
 * )[] | import('source-map').SourceNode | string} generated
 * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration|null|undefined} [node]
 */
function toSourceNodeWhenNeeded(generated, node) {
    if (!sourceMap) {
        // with no source maps, generated is either an
        // array or a string.  if an array, flatten it.
        // if a string, just return it
        if (Array.isArray(generated)) {
            return flattenToString(generated);
        }
        return generated;
    }

    /** @type {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration|{loc?: null, name?: null}|null|undefined} */
    let checkNode = node;
    if (checkNode == null) {
        if (generated instanceof SourceNode) {
            return generated;
        }
        checkNode = {};
    }
    if (checkNode.loc == null) {
        return new SourceNode(
            null,
            null,
            /** @type {string} */ (sourceMap),
            /** @type {string | import('source-map').SourceNode | (string|import('source-map').SourceNode)[]} */
            (generated),
            /* c8 ignore next -- Guard */
            ('name' in checkNode && checkNode.name) || undefined
        );
    }
    return new SourceNode(
        checkNode.loc.start.line,
        checkNode.loc.start.column,
        (sourceMap === true ? checkNode.loc.source || null : sourceMap),
        /** @type {string | import('source-map').SourceNode | (string|import('source-map').SourceNode)[]} */
        (generated),
        ('name' in checkNode && checkNode.name) || undefined
    );
}

function noEmptySpace() {
    return space || ' ';
}

/**
 * @typedef {StringOrSourceNodeOrArray[]} StringOrSourceNodeOrArrayArray
 */
/**
 * @typedef {string|import('source-map').SourceNode|(string|import('source-map').SourceNode|StringOrSourceNodeOrArrayArray)[]} StringOrSourceNodeOrArray
 */

/**
 * @param {StringOrSourceNodeOrArray} left
 * @param {StringOrSourceNodeOrArray} right
 */
function join(left, right) {
    const leftSource = toSourceNodeWhenNeeded(left).toString();
    if (leftSource.length === 0) {
        return [right];
    }

    const rightSource = toSourceNodeWhenNeeded(right).toString();
    /* c8 ignore next 3 */
    if (rightSource.length === 0) {
        return [left];
    }

    const leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
    const rightCharCode = rightSource.charCodeAt(0);

    if ((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode ||
            esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) ||
            leftCharCode === 0x2F  /* / */ && rightCharCode === 0x69  /* i */) { // infix word operators all start with `i`
        return [left, noEmptySpace(), right];
    }
    if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) ||
                esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
        return [left, right];
    }
    return [left, space, right];
}

/**
 * @param {string|NestedStringArray|import('source-map').SourceNode} stmt
 */
function addIndent(stmt) {
    return [base, stmt];
}

/**
 * @param {(s: string) => void} fn
 */
function withIndent(fn) {
    const previousBase = base;
    base += indent;
    fn(base);
    base = previousBase;
}

/**
 * @param {string} str
 */
function calculateSpaces(str) {
    let i;
    for (i = str.length - 1; i >= 0; --i) {
        if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
            break;
        }
    }
    return (str.length - 1) - i;
}

/**
 * @param {string} value
 * @param {string} [specialBase]
 */
function adjustMultilineComment(value, specialBase) {
    const array = value.split(/\r\n|[\r\n]/);
    let spaces = Number.MAX_VALUE;

    // first line doesn't have indentation
    for (let i = 1, len = array.length; i < len; ++i) {
        const line = array[i];
        let j = 0;
        while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
            ++j;
        }
        if (spaces > j) {
            spaces = j;
        }
    }

    let previousBase;
    if (typeof specialBase !== 'undefined') {
        // pattern like
        // {
        //   var t = 20;  /*
        //                 * this is comment
        //                 */
        // }
        previousBase = base;
        if (array[1][spaces] === '*') {
            specialBase += ' ';
        }
        base = specialBase;
    } else {
        if (spaces & 1) {
            // /*
            //  *
            //  */
            // If spaces are odd number, above pattern is considered.
            // We waste 1 space.
            --spaces;
        }
        previousBase = base;
    }

    for (let i = 1, len = array.length; i < len; ++i) {
        const sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
        array[i] = /** @type {string} */ (sn);
    }

    base = previousBase;

    return array.join('\n');
}

/**
 * @param {import('estree').Comment} comment
 * @param {string} [specialBase]
 */
function generateComment(comment, specialBase) {
    if (comment.type === 'Line') {
        if (endsWithLineTerminator(comment.value)) {
            return `//${comment.value}`;
        } else {
            // Always use LineTerminator
            let result = `//${comment.value}`;
            if (!preserveBlankLines) {
                result += '\n';
            }
            return result;
        }
    }
    if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
        return adjustMultilineComment(`/*${comment.value}*/`, specialBase);
    }
    return `/*${comment.value}*/`;
}

/**
 * @param {string} stmt
 * @param {string} result
 */
function addJsdoc (stmt, result) {
    return [stmt, result];
}

/**
 * @typedef {(string|import('source-map').SourceNode|NestedStringArray)[]} NestedStringArray
 */

/**
 * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration} stmt
 * @param {NestedStringArray} result
 */
function addComments(stmt, result) {
    if (stmt.leadingComments && stmt.leadingComments.length > 0) {
        const save = result;

        if (preserveBlankLines) {
            const [comment] = stmt.leadingComments;
            result = [];

            /** @type {[number, number]} */
            // @ts-expect-error Extended estree
            const extRange = comment.extendedRange;

            /** @type {[number, number]} */
            // @ts-expect-error Extended estree
            // eslint-disable-next-line prefer-destructuring -- TS
            let range = comment.range;

            const prefix = /** @type {string} */ (sourceCode).substring(extRange[0], range[0]);
            let count = (prefix.match(/\n/g) || []).length;
            if (count > 0) {
                result.push(stringRepeat('\n', count));
                result.push(addIndent(generateComment(comment)));
            } else {
                result.push(prefix);
                result.push(generateComment(comment));
            }

            let prevRange = range;

            for (let i = 1, len = stmt.leadingComments.length; i < len; i++) {
                const comment = stmt.leadingComments[i];
                // @ts-expect-error Extended estree
                ({ range } = comment);

                const infix = /** @type {string} */ (sourceCode).substring(prevRange[1], range[0]);
                count = (infix.match(/\n/g) || []).length;
                result.push(stringRepeat('\n', count));
                result.push(addIndent(generateComment(comment)));

                prevRange = range;
            }

            const suffix = /** @type {string} */ (sourceCode).substring(range[1], extRange[1]);
            count = (suffix.match(/\n/g) || []).length;
            result.push(stringRepeat('\n', count));
        } else {
            const [comment] = stmt.leadingComments;
            result = [];
            if (safeConcatenation && stmt.type === Syntax.Program &&
                /** @type {import('estree').Program} */
                (/** @type {unknown} */ (stmt)).body.length === 0) {
                result.push('\n');
            }
            result.push(generateComment(comment));
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push('\n');
            }

            for (let i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                const comment = stmt.leadingComments[i];
                const fragment = [generateComment(comment)];
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    fragment.push('\n');
                }
                result.push(addIndent(fragment));
            }
        }

        result.push(addIndent(save));
    }

    if (stmt.trailingComments) {

        if (preserveBlankLines) {
            const [comment] = stmt.trailingComments;

            /** @type {[number, number]} */
            // @ts-expect-error Extended estree
            const extRange = comment.extendedRange;

            /** @type {[number, number]} */
            // @ts-expect-error Extended estree
            // eslint-disable-next-line prefer-destructuring -- TS
            const range = comment.range;

            const prefix = /** @type {string} */ (sourceCode).substring(extRange[0], range[0]);
            const count = (prefix.match(/\n/g) || []).length;

            if (count > 0) {
                result.push(stringRepeat('\n', count));
                result.push(addIndent(generateComment(comment)));
            } else {
                result.push(prefix);
                result.push(generateComment(comment));
            }
        } else {
            const tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
            const specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
            for (let i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                const comment = stmt.trailingComments[i];
                if (tailingToStatement) {
                    // We assume target like following script
                    //
                    // var t = 20;  /**
                    //               * This is comment of t
                    //               */
                    if (i === 0) {
                        // first case
                        result = [result, indent];
                    } else {
                        result = [result, specialBase];
                    }
                    result.push(generateComment(comment, specialBase));
                /* c8 ignore next 3 */
                } else {
                    result = [result, addIndent(generateComment(comment))];
                }
                if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result = [result, '\n'];
                }
            }
        }
    }

    return result;
}

/**
 * @param {number} start
 * @param {number} end
 * @param {NestedStringArray} result
 */
function generateBlankLines(start, end, result) {
    let newlineCount = 0;

    for (let j = start; j < end; j++) {
        if (/** @type {string} */ (sourceCode)[j] === '\n') {
            newlineCount++;
        }
    }

    for (let j = 1; j < newlineCount; j++) {
        result.push(newline);
    }
}

/**
 * @param {StringOrSourceNodeOrArray} text
 * @param {number} current
 * @param {number} should
 */
function parenthesize(text, current, should) {
    if (current < should) {
        return ['(', text, ')'];
    }
    return text;
}

/**
 * @param {string} string
 */
function generateVerbatimString(string) {
    const result = string.split(/\r\n|\n/);
    for (let i = 1, iz = result.length; i < iz; i++) {
        result[i] = newline + base + result[i];
    }
    return result;
}

/**
 * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration} expr
 * @param {number|undefined} precedence
 */
function generateVerbatim(expr, precedence) {
    const verbatim =
        /**
         * @type {string|{
         *   content: string,
         *   precedence: number
         * }}
         */ (
            expr[/** @type {keyof expr} */ (extra.verbatim)]
        );

    /* c8 ignore next 3 -- TS */
    if (!verbatim) {
        throw new Error('Unexpected falsy verbatim');
    }

    let result;
    if (typeof verbatim === 'string') {
        result = parenthesize(
            generateVerbatimString(verbatim),
            Precedence.Sequence,
            /** @type {number} */
            (precedence)
        );
    } else {
        // verbatim is object
        result = generateVerbatimString(verbatim.content);
        const prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
        result = parenthesize(
            result,
            prec,
            /** @type {number} */
            (precedence)
        );
    }

    return toSourceNodeWhenNeeded(result, expr);
}

/**
 * @param {import('estree').Identifier|import('estree').PrivateIdentifier} node
 */
function generateIdentifier(node) {
    return toSourceNodeWhenNeeded(node.name, node);
}

/**
 * @param {import('estree').Node} node
 * @param {boolean} spaceRequired
 */
function generateAsyncPrefix(node, spaceRequired) {
    return 'async' in node && node.async
        ? `async${spaceRequired ? noEmptySpace() : space}`
        : '';
}

/**
 * @param {import('estree').FunctionDeclaration|import('estree').FunctionExpression} node
 */
function generateStarSuffix(node) {
    const isGenerator = node.generator && !extra.moz.starlessGenerator;
    return isGenerator ? `*${space}` : '';
}

/**
 * @param {import('estree').MethodDefinition|import('estree').Property} prop
 */
function generateMethodPrefix(prop) {
    const func = prop.value;

    let prefix = '';
    if ('async' in func && func.async) {
        prefix += generateAsyncPrefix(func, !prop.computed);
    }
    if ('generator' in func && func.generator) {
        // avoid space before method name
        prefix += generateStarSuffix(
            /** @type {import('estree').FunctionExpression | import('estree').FunctionDeclaration} */
            (func)
        ) ? '*' : '';
    }
    return prefix;
}

const Statement = {
    /** @type {((stmt: import('@es-joy/jsdoccomment').JsdocBlock) => string)|null} */
    JsdocBlock: null,

    /**
     * @this {CodeGenerator}
     * @param {import('estree').BlockStatement} stmt
     * @param {number} flags
     */
    BlockStatement (stmt, flags) {
        const that = this;
        /** @type {NestedStringArray} */
        let result = ['{', newline];

        withIndent(function () {
            // handle functions without any code
            if (stmt.body.length === 0 && preserveBlankLines) {
                /** @type {[number, number]} */
                // @ts-expect-error Extended estree
                // eslint-disable-next-line prefer-destructuring -- TS
                const range = stmt.range;
                if (range[1] - range[0] > 2) {
                    const content = /** @type {string} */ (
                        sourceCode
                    ).substring(range[0] + 1, range[1] - 1);
                    if (content[0] === '\n') {
                        result = ['{'];
                    }
                    result.push(content);
                }
            }

            let bodyFlags = S_TFFF;
            if (flags & F_FUNC_BODY) {
                bodyFlags |= F_DIRECTIVE_CTX;
            }

            for (let i = 0, iz = stmt.body.length; i < iz; ++i) {
                if (preserveBlankLines) {
                    // handle spaces before the first line
                    if (i === 0) {
                        if (stmt.body[0].leadingComments) {
                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const range = stmt.body[0].leadingComments[0].extendedRange;
                            const content = /** @type {string} */ (
                                sourceCode
                            ).substring(range[0], range[1]);
                            if (content[0] === '\n') {
                                result = ['{'];
                            }
                        }
                        if (!stmt.body[0].leadingComments) {
                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            // eslint-disable-next-line prefer-destructuring -- TS
                            const range = stmt.range;

                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const bodyItemRange = stmt.body[0].range;
                            generateBlankLines(range[0], bodyItemRange[0], result);
                        }
                    }

                    // handle spaces between lines
                    if (i > 0) {
                        if (!stmt.body[i - 1].trailingComments  && !stmt.body[i].leadingComments) {
                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const bodyItemRangePrev = stmt.body[i - 1].range;

                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const bodyItemRange = stmt.body[i].range;

                            generateBlankLines(bodyItemRangePrev[1], bodyItemRange[0], result);
                        }
                    }
                }

                if (i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }

                let fragment;
                if (stmt.body[i].leadingComments && preserveBlankLines) {
                    fragment = that.generateStatement(stmt.body[i], bodyFlags);
                } else {
                    fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
                }

                result.push(fragment);
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    if (preserveBlankLines && i < iz - 1) {
                        // don't add a new line if there are leading coments
                        // in the next statement
                        if (!stmt.body[i + 1].leadingComments) {
                            result.push(newline);
                        }
                    } else {
                        result.push(newline);
                    }
                }

                if (preserveBlankLines) {
                    // handle spaces after the last line
                    if (i === iz - 1) {
                        if (!stmt.body[i].trailingComments) {
                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            // eslint-disable-next-line prefer-destructuring -- TS
                            const range = stmt.range;

                            /** @type {[number, number]} */
                            // @ts-expect-error Extended estree
                            const bodyItemRange = stmt.body[i].range;
                            generateBlankLines(bodyItemRange[1], range[1], result);
                        }
                    }
                }
            }
        });

        result.push(addIndent('}'));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').BreakStatement} stmt
     * @param {number} flags
     */
    BreakStatement (stmt, flags) {
        if (stmt.label) {
            return `break ${stmt.label.name}${this.semicolon(flags)}`;
        }
        return `break${this.semicolon(flags)}`;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ContinueStatement} stmt
     * @param {number} flags
     */
    ContinueStatement (stmt, flags) {
        if (stmt.label) {
            return `continue ${stmt.label.name}${this.semicolon(flags)}`;
        }
        return `continue${this.semicolon(flags)}`;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ClassBody} stmt
     * @param {number} flags
     */
    ClassBody (stmt, flags) {
        /** @type {NestedStringArray} */
        const result = [ '{', newline];
        const that = this;

        withIndent(function (indent) {
            for (let i = 0, iz = stmt.body.length; i < iz; ++i) {
                result.push(indent);
                result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
                if (i + 1 < iz) {
                    result.push(newline);
                }
            }
        });

        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(base);
        result.push('}');
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ClassDeclaration} stmt
     * @param {number} flags
     */
    ClassDeclaration (stmt, flags) {
        let result  = /** @type {NestedStringArray} */ (['class']);
        if (stmt.id) {
            result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
        }
        if (stmt.superClass) {
            const fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Unary, E_TTT));
            result = join(result, fragment);
        }
        result.push(space);
        result.push(this.generateStatement(stmt.body, S_TFFT));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Node & {
     *   raw?: string,
     *   directive: string
     * }} stmt
     * @param {number} flags
     */
    DirectiveStatement (stmt, flags) {
        if (extra.raw && stmt.raw) {
            return stmt.raw + this.semicolon(flags);
        }
        return escapeDirective(stmt.directive) + this.semicolon(flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').DoWhileStatement} stmt
     * @param {number} flags
     */
    DoWhileStatement (stmt, flags) {
        // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
        let result = join('do', this.maybeBlock(stmt.body, S_TFFF));
        result = this.maybeBlockSuffix(stmt.body, result);
        return join(result, [
            `while${space}(`,
            this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
            `)${this.semicolon(flags)}`
        ]);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').CatchClause & {
     *   guard: import('estree').BinaryExpression
     * }} stmt
     * @param {number} flags
     */
    CatchClause (stmt, flags) {
        const that = this;
        /** @type {NestedStringArray} */
        let result = [];
        withIndent(function () {
            let guard;

            if (stmt.param) {
                result = [
                    `catch${space}(`,
                    that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                    ')'
                ];

                if (stmt.guard) {
                    guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                    result.splice(2, 0, ' if ', guard);
                }
            } else {
                result = ['catch'];
            }
        });
        result.push(this.maybeBlock(stmt.body, S_TFFF));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').DebuggerStatement} stmt
     * @param {number} flags
     */
    DebuggerStatement (stmt, flags) {
        return `debugger${this.semicolon(flags)}`;
    },

    /**
     * @param {import('estree').EmptyStatement} stmt
     * @param {number} flags
     */
    EmptyStatement (stmt, flags) {
        return ';';
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExportDefaultDeclaration} stmt
     * @param {number} flags
     */
    ExportDefaultDeclaration (stmt, flags) {
        const bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

        /** @type {NestedStringArray} */
        let result = [ 'export' ];

        // export default HoistableDeclaration[Default]
        // export default AssignmentExpression[In] ;
        result = join(result, 'default');
        if (isStatement(stmt.declaration)) {
            result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
        } else {
            result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExportNamedDeclaration} stmt
     * @param {number} flags
     */
    ExportNamedDeclaration (stmt, flags) {
        const that = this;

        const bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

        /** @type {NestedStringArray} */
        let result = [ 'export' ];

        // export VariableStatement
        // export Declaration[Default]
        if (stmt.declaration) {
            return join(result, this.generateStatement(stmt.declaration, bodyFlags));
        }

        // export ExportClause[NoReference] FromClause ;
        // export ExportClause ;
        if (stmt.specifiers) {
            if (stmt.specifiers.length === 0) {
                result = join(result, `{${space}}`);
            } else {
                result = join(result, '{');
                withIndent(function (indent) {
                    result.push(newline);
                    for (let i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                        result.push(indent);
                        result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                        if (i + 1 < iz) {
                            result.push(`,${newline}`);
                        }
                    }
                });
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }
                result.push(`${base}}`);
            }

            if (stmt.source) {
                result = join(result, [
                    `from${space}`,
                    // ModuleSpecifier
                    this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                    this.semicolon(flags)
                ]);
            } else {
                result.push(this.semicolon(flags));
            }
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExportAllDeclaration} stmt
     * @param {number} flags
     */
    ExportAllDeclaration (stmt, flags) {
        // export * FromClause ;
        return [
            `export${space}`,
            `*${space}`,
            `from${space}`,
            // ModuleSpecifier
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags)
        ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ExpressionStatement} stmt
     * @param {number} flags
     */
    ExpressionStatement (stmt, flags) {
        /**
         * @param {string} fragment
         */
        function isClassPrefixed(fragment) {
            if (fragment.slice(0, 5) !== 'class') {
                return false;
            }
            const code = fragment.charCodeAt(5);
            return code === 0x7B  /* '{' */ || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
        }

        /**
         * @param {string} fragment
         */
        function isFunctionPrefixed(fragment) {
            if (fragment.slice(0, 8) !== 'function') {
                return false;
            }
            const code = fragment.charCodeAt(8);
            return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
        }

        /**
         * @param {string} fragment
         */
        function isAsyncPrefixed(fragment) {
            if (fragment.slice(0, 5) !== 'async') {
                return false;
            }
            if (!esutils.code.isWhiteSpace(fragment.charCodeAt(5))) {
                return false;
            }
            let i, iz;
            for (i = 6, iz = fragment.length; i < iz; ++i) {
                if (!esutils.code.isWhiteSpace(fragment.charCodeAt(i))) {
                    break;
                }
            }
            if (i === iz) {
                return false;
            }
            if (fragment.slice(i, i + 8) !== 'function') {
                return false;
            }
            const code = fragment.charCodeAt(i + 8);
            return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
        }

        /** @type {NestedStringArray} */
        let result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
        // 12.4 '{', 'function', 'class' is not allowed in this position.
        // wrap expression with parentheses
        const fragment = toSourceNodeWhenNeeded(result).toString();
        if (fragment.charCodeAt(0) === 0x7B  /* '{' */ ||  // ObjectExpression
                    isClassPrefixed(fragment) ||
                    isFunctionPrefixed(fragment) ||
                    isAsyncPrefixed(fragment) ||
                    (directive && (flags & F_DIRECTIVE_CTX) && stmt.expression.type === Syntax.Literal &&
                        typeof (/** @type {import('estree').Literal} */ (stmt.expression)).value === 'string')) {
            result = ['(', result, `)${this.semicolon(flags)}`];
        } else {
            result.push(this.semicolon(flags));
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ImportDeclaration} stmt
     * @param {number} flags
     */
    ImportDeclaration (stmt, flags) {
        // ES6: 15.2.1 valid import declarations:
        //     - import ImportClause FromClause ;
        //     - import ModuleSpecifier ;
        const that = this;

        // If no ImportClause is present,
        // this should be `import ModuleSpecifier` so skip `from`
        // ModuleSpecifier is StringLiteral.
        if (stmt.specifiers.length === 0) {
            // import ModuleSpecifier ;
            return [
                'import',
                space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ];
        }

        // import ImportClause FromClause ;

        /** @type {NestedStringArray} */
        let result = [
            'import'
        ];
        let cursor = 0;

        // ImportedBinding
        if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
            result = join(result, [
                this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
            ]);
            ++cursor;
        }

        if (stmt.specifiers[cursor]) {
            if (cursor !== 0) {
                result.push(',');
            }

            if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
                // NameSpaceImport
                result = join(result, [
                    space,
                    this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
            } else {
                // NamedImports
                result.push(`${space}{`);

                if ((stmt.specifiers.length - cursor) === 1) {
                    // import { ... } from "...";
                    result.push(space);
                    result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                    result.push(`${space}}${space}`);
                } else {
                    // import {
                    //    ...,
                    //    ...,
                    // } from "...";
                    withIndent(function (indent) {
                        result.push(newline);
                        for (let i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                            result.push(indent);
                            result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                            if (i + 1 < iz) {
                                result.push(`,${newline}`);
                            }
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result.push(newline);
                    }
                    result.push(`${base}}${space}`);
                }
            }
        }

        result = join(result, [
            `from${space}`,
            // ModuleSpecifier
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags)
        ]);
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').VariableDeclarator} stmt
     * @param {number} flags
     */
    VariableDeclarator (stmt, flags) {
        const itemFlags = (flags & F_ALLOW_IN) ? E_TTT : E_FTT;
        if (stmt.init) {
            return [
                this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
                space,
                '=',
                space,
                this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
            ];
        }
        return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').VariableDeclaration} stmt
     * @param {number} flags
     */
    VariableDeclaration (stmt, flags) {
        // VariableDeclarator is typed as Statement,
        // but joined with comma (not LineTerminator).
        // So if comment is attached to target node, we should specialize.
        const that = this;

        /** @type {NestedStringArray} */
        const result = [ stmt.kind ];

        const bodyFlags = (flags & F_ALLOW_IN) ? S_TFFF : S_FFFF;

        function block() {
            const [node] = stmt.declarations;
            if (extra.comment && node.leadingComments) {
                result.push('\n');
                result.push(addIndent(that.generateStatement(node, bodyFlags)));
            } else {
                result.push(noEmptySpace());
                result.push(that.generateStatement(node, bodyFlags));
            }

            for (let i = 1, iz = stmt.declarations.length; i < iz; ++i) {
                const node = stmt.declarations[i];
                if (extra.comment && node.leadingComments) {
                    result.push(`,${newline}`);
                    result.push(addIndent(that.generateStatement(node, bodyFlags)));
                } else {
                    result.push(`,${space}`);
                    result.push(that.generateStatement(node, bodyFlags));
                }
            }
        }

        if (stmt.declarations.length > 1) {
            withIndent(block);
        } else {
            block();
        }

        result.push(this.semicolon(flags));

        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ThrowStatement} stmt
     * @param {number} flags
     */
    ThrowStatement (stmt, flags) {
        return [join(
            'throw',
            this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
        ), this.semicolon(flags)];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').TryStatement & {
     *   handlers?: (import('estree').CatchClause)[],
     *   guardedHandlers?: (import('estree').CatchClause)[],
     * }} stmt
     * @param {number} flags
     */
    TryStatement (stmt, flags) {
        /** @type {NestedStringArray} */
        let result = ['try', this.maybeBlock(stmt.block, S_TFFF)];
        result = this.maybeBlockSuffix(stmt.block, result);

        if (stmt.handlers) {
            // old interface
            for (let i = 0, iz = stmt.handlers.length; i < iz; ++i) {
                result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) {
                    result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
                }
            }
        } else {
            const guardedHandlers = stmt.guardedHandlers || [];

            for (let i = 0, iz = guardedHandlers.length; i < iz; ++i) {
                result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) {
                    result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
                }
            }

            // new interface
            if (stmt.handler) {
                if (Array.isArray(stmt.handler)) {
                    for (let i = 0, iz = stmt.handler.length; i < iz; ++i) {
                        result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                        if (stmt.finalizer || i + 1 !== iz) {
                            result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                        }
                    }
                } else {
                    result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                    if (stmt.finalizer) {
                        result = this.maybeBlockSuffix(stmt.handler.body, result);
                    }
                }
            }
        }
        if (stmt.finalizer) {
            result = join(result, ['finally', this.maybeBlock(stmt.finalizer, S_TFFF)]);
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').SwitchStatement} stmt
     * @param {number} flags
     */
    SwitchStatement (stmt, flags) {
        const that = this;
        let result = [];
        withIndent(function () {
            result = [
                `switch${space}(`,
                that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
                `)${space}{${newline}`
            ];
        });
        if (stmt.cases) {
            let bodyFlags = S_TFFF;
            for (let i = 0, iz = stmt.cases.length; i < iz; ++i) {
                if (i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }
                const fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
                result.push(fragment);
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                }
            }
        }
        result.push(addIndent('}'));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').SwitchCase} stmt
     * @param {number} flags
     */
    SwitchCase (stmt, flags) {
        const that = this;
        let result;
        withIndent(function () {
            if (stmt.test) {
                result = [
                    join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                    ':'
                ];
            } else {
                result = ['default:'];
            }

            let i = 0;
            const iz = stmt.consequent.length;
            if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
                const fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
                result.push(fragment);
                i = 1;
            }

            if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }

            let bodyFlags = S_TFFF;
            for (; i < iz; ++i) {
                if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }
                const fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
                result.push(fragment);
                if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                }
            }
        });
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').IfStatement} stmt
     * @param {number} flags
     */
    IfStatement (stmt, flags) {
        const that = this;

        /** @type {NestedStringArray} */
        let result = [];
        withIndent(function () {
            result = [
                `if${space}(`,
                that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')'
            ];
        });
        const semicolonOptional = flags & F_SEMICOLON_OPT;
        let bodyFlags = S_TFFF;
        if (semicolonOptional) {
            bodyFlags |= F_SEMICOLON_OPT;
        }
        if (stmt.alternate) {
            result.push(this.maybeBlock(stmt.consequent, S_TFFF));
            result = this.maybeBlockSuffix(stmt.consequent, result);
            if (stmt.alternate.type === Syntax.IfStatement) {
                result = join(result, ['else ', this.generateStatement(stmt.alternate, bodyFlags)]);
            } else {
                result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
            }
        } else {
            result.push(this.maybeBlock(stmt.consequent, bodyFlags));
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ForStatement} stmt
     * @param {number} flags
     */
    ForStatement (stmt, flags) {
        const that = this;

        /** @type {NestedStringArray} */
        let result = [];
        withIndent(function () {
            result = [`for${space}(`];
            if (stmt.init) {
                if (stmt.init.type === Syntax.VariableDeclaration) {
                    result.push(that.generateStatement(stmt.init, S_FFFF));
                } else {
                    // F_ALLOW_IN becomes false.
                    result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                    result.push(';');
                }
            } else {
                result.push(';');
            }

            if (stmt.test) {
                result.push(space);
                result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
                result.push(';');
            } else {
                result.push(';');
            }

            if (stmt.update) {
                result.push(space);
                result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
                result.push(')');
            } else {
                result.push(')');
            }
        });

        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ForInStatement} stmt
     * @param {number} flags
     */
    ForInStatement (stmt, flags) {
        return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ForOfStatement} stmt
     * @param {number} flags
     */
    ForOfStatement (stmt, flags) {
        return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').LabeledStatement} stmt
     * @param {number} flags
     */
    LabeledStatement (stmt, flags) {
        return [`${stmt.label.name}:`, this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Program} stmt
     * @param {number} flags
     */
    Program (stmt, flags) {
        const iz = stmt.body.length;
        const initialNewline = safeConcatenation && iz > 0;

        /** @type {NestedStringArray} */
        const result = [initialNewline ? '\n' : ''];

        if ('jsdocBlocks' in stmt && stmt.jsdocBlocks) {
            /** @type {import('@es-joy/jsdoccomment').JsdocBlock[]} */
            (stmt.jsdocBlocks).forEach((jsdocBlock) => {
                result.push(
                    /** @type {((stmt: import('@es-joy/jsdoccomment').JsdocBlock) => string)} */ (
                        this.JsdocBlock
                    )(jsdocBlock)
                );
            });
            result.push('\n\n');
        }

        let bodyFlags = S_TFTF;
        for (let i = 0; i < iz; ++i) {
            if (!safeConcatenation && i === iz - 1) {
                bodyFlags |= F_SEMICOLON_OPT;
            }

            if (preserveBlankLines) {
                // handle spaces before the first line
                if (i === 0) {
                    if (!stmt.body[0].leadingComments) {
                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        // eslint-disable-next-line prefer-destructuring -- TS
                        const range = stmt.range;

                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        const bodyRange = stmt.body[i].range;
                        generateBlankLines(range[0], bodyRange[0], result);
                    }
                }

                // handle spaces between lines
                if (i > 0) {
                    if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        const bodyItemRangePrev = stmt.body[i - 1].range;

                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        const bodyItemRange = stmt.body[i].range;
                        generateBlankLines(bodyItemRangePrev[1], bodyItemRange[0], result);
                    }
                }
            }

            const fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
            result.push(fragment);
            if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                if (preserveBlankLines) {
                    if (!stmt.body[i + 1].leadingComments) {
                        result.push(newline);
                    }
                } else {
                    result.push(newline);
                }
            }

            if (preserveBlankLines) {
                // handle spaces after the last line
                if (i === iz - 1) {
                    if (!stmt.body[i].trailingComments) {
                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        // eslint-disable-next-line prefer-destructuring -- TS
                        const range = stmt.range;

                        /** @type {[number, number]} */
                        // @ts-expect-error Extended estree
                        const bodyRange = stmt.body[i].range;
                        generateBlankLines(bodyRange[1], range[1], result);
                    }
                }
            }
        }
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').FunctionDeclaration} stmt
     * @param {number} flags
     */
    FunctionDeclaration (stmt, flags) {
        return [
            generateAsyncPrefix(stmt, true),
            'function',
            generateStarSuffix(stmt) || noEmptySpace(),
            stmt.id ? generateIdentifier(stmt.id) : '',
            this.generateFunctionBody(stmt)
        ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ReturnStatement} stmt
     * @param {number} flags
     */
    ReturnStatement (stmt, flags) {
        if (stmt.argument) {
            return [join(
                'return',
                this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ), this.semicolon(flags)];
        }
        return [`return${this.semicolon(flags)}`];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').WhileStatement} stmt
     * @param {number} flags
     */
    WhileStatement (stmt, flags) {
        const that = this;
        let result = [];
        withIndent(function () {
            result = [
                `while${space}(`,
                that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')'
            ];
        });
        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').WithStatement} stmt
     * @param {number} flags
     */
    WithStatement (stmt, flags) {
        const that = this;
        let result = [];
        withIndent(function () {
            result = [
                `with${space}(`,
                that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
                ')'
            ];
        });
        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
    }
};

const Expression = {

    /**
     * @this {CodeGenerator}
     * @param {import('estree').SequenceExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    SequenceExpression (expr, precedence, flags) {
        if (Precedence.Sequence < precedence) {
            flags |= F_ALLOW_IN;
        }
        const result = [];
        for (let i = 0, iz = expr.expressions.length; i < iz; ++i) {
            result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
            if (i + 1 < iz) {
                result.push(`,${space}`);
            }
        }
        return parenthesize(result, Precedence.Sequence, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').AssignmentExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    AssignmentExpression (expr, precedence, flags) {
        return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ArrowFunctionExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ArrowFunctionExpression (expr, precedence, flags) {
        return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ConditionalExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ConditionalExpression (expr, precedence, flags) {
        if (Precedence.Conditional < precedence) {
            flags |= F_ALLOW_IN;
        }
        return parenthesize(
            [
                this.generateExpression(expr.test, Precedence.Coalesce, flags),
                `${space}?${space}`,
                this.generateExpression(expr.consequent, Precedence.Assignment, flags),
                `${space}:${space}`,
                this.generateExpression(expr.alternate, Precedence.Assignment, flags)
            ],
            Precedence.Conditional,
            precedence
        );
    },

    /**
     * @param {import('estree').LogicalExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    LogicalExpression (expr, precedence, flags) {
        if (expr.operator === '??') {
            flags |= F_FOUND_COALESCE;
        }

        // @ts-expect-error See comments under `Object.assign` of prototypes below
        return this.BinaryExpression(expr, precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').BinaryExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    BinaryExpression (expr, precedence, flags) {
        const currentPrecedence = BinaryPrecedence[expr.operator];
        const leftPrecedence = expr.operator === '**' ? Precedence.Postfix : currentPrecedence;
        const rightPrecedence = expr.operator === '**' ? currentPrecedence : currentPrecedence + 1;

        if (currentPrecedence < precedence) {
            flags |= F_ALLOW_IN;
        }

        let fragment = this.generateExpression(expr.left, leftPrecedence, flags);

        const leftSource = fragment.toString();

        let result;
        if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) {
            result = [fragment, noEmptySpace(), expr.operator];
        } else {
            result = join(fragment, expr.operator);
        }

        fragment = this.generateExpression(expr.right, rightPrecedence, flags);

        if (expr.operator === '/' && fragment.toString().charAt(0) === '/' ||
            expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
            // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
            result.push(noEmptySpace());
            result.push(fragment);
        } else {
            result = join(result, fragment);
        }

        if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
            return ['(', result, ')'];
        }
        // @ts-expect-error Older implementation?
        if ((expr.operator === '||' || expr.operator === '&&') && (flags & F_FOUND_COALESCE)) {
            return ['(', result, ')'];
        }
        return parenthesize(result, currentPrecedence, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').CallExpression & {
     *   optional?: boolean
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    CallExpression (expr, precedence, flags) {
        // F_ALLOW_UNPARATH_NEW becomes false.
        const result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];

        if (expr.optional) {
            result.push('?.');
        }

        result.push('(');
        for (let i = 0, iz = expr['arguments'].length; i < iz; ++i) {
            result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
            if (i + 1 < iz) {
                result.push(`,${space}`);
            }
        }
        result.push(')');

        if (!(flags & F_ALLOW_CALL)) {
            return ['(', result, ')'];
        }

        return parenthesize(result, Precedence.Call, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ChainExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ChainExpression (expr, precedence, flags) {
        if (Precedence.OptionalChaining < precedence) {
            flags |= F_ALLOW_CALL;
        }

        const result = this.generateExpression(expr.expression, Precedence.OptionalChaining, flags);

        return parenthesize(result, Precedence.OptionalChaining, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').NewExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    NewExpression (expr, precedence, flags) {
        const { length } = expr['arguments'];

        // F_ALLOW_CALL becomes false.
        // F_ALLOW_UNPARATH_NEW may become false.
        const itemFlags = (flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0) ? E_TFT : E_TFF;

        const result = join(
            'new',
            this.generateExpression(expr.callee, Precedence.New, itemFlags)
        );

        if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
            result.push('(');
            for (let i = 0, iz = length; i < iz; ++i) {
                result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) {
                    result.push(`,${space}`);
                }
            }
            result.push(')');
        }

        return parenthesize(result, Precedence.New, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').MemberExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    MemberExpression (expr, precedence, flags) {
        // F_ALLOW_UNPARATH_NEW becomes false.
        const result = [this.generateExpression(expr.object, Precedence.Call, (flags & F_ALLOW_CALL) ? E_TTF : E_TFF)];

        if (expr.computed) {
            if (expr.optional) {
                result.push('?.');
            }

            result.push('[');
            result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
            result.push(']');
        } else {
            if (!expr.optional && expr.object.type === Syntax.Literal &&
                typeof /** @type {import('estree').Literal} */ (expr.object).value === 'number'
            ) {
                const fragment = toSourceNodeWhenNeeded(result).toString();
                // When the following conditions are all true,
                //   1. No floating point
                //   2. Don't have exponents
                //   3. The last character is a decimal digit
                //   4. Not hexadecimal OR octal number literal
                // we should add a floating point.
                if (
                    fragment.indexOf('.') < 0 &&
                            !/[eExX]/.test(fragment) &&
                            esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) &&
                            !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)  // '0'
                ) {
                    result.push(' ');
                }
            }
            result.push(expr.optional ? '?.' : '.');
            result.push(generateIdentifier(
                /** @type {import('estree').PrivateIdentifier} */
                (expr.property)
            ));
        }

        return parenthesize(result, Precedence.Member, precedence);
    },

    /**
     * @param {import('estree').MetaProperty} expr
     * @param {number} precedence
     * @param {number} flags
     */
    MetaProperty (expr, precedence, flags) {
        const result = [];
        result.push(typeof expr.meta === 'string' ? expr.meta : generateIdentifier(expr.meta));
        result.push('.');
        result.push(typeof expr.property === 'string' ? expr.property : generateIdentifier(expr.property));
        return parenthesize(result, Precedence.Member, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').UnaryExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    UnaryExpression (expr, precedence, flags) {
        const fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);

        /** @type {NestedStringArray} */
        let result;
        if (space === '') {
            result = join(expr.operator, fragment);
        } else {
            result = [expr.operator];
            if (expr.operator.length > 2) {
                // delete, void, typeof
                // get `typeof []`, not `typeof[]`
                result = join(result, fragment);
            } else {
                // Prevent inserting spaces between operator and argument if it is unnecessary
                // like, `!cond`
                const leftSource = toSourceNodeWhenNeeded(result).toString();
                const leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                const rightCharCode = fragment.toString().charCodeAt(0);

                if (((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode) ||
                            (esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode))) {
                    result.push(noEmptySpace());
                    result.push(fragment);
                } else {
                    result.push(fragment);
                }
            }
        }
        return parenthesize(result, Precedence.Unary, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').YieldExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    YieldExpression (expr, precedence, flags) {
        /** @type {StringOrSourceNodeOrArray} */
        let result;
        if (expr.delegate) {
            result = 'yield*';
        } else {
            result = 'yield';
        }
        if (expr.argument) {
            result = join(
                result,
                this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
            );
        }
        return parenthesize(result, Precedence.Yield, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').AwaitExpression & {
     *   all?: boolean
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    AwaitExpression (expr, precedence, flags) {
        const result = join(
            expr.all ? 'await*' : 'await',
            this.generateExpression(expr.argument, Precedence.Await, E_TTT)
        );
        return parenthesize(result, Precedence.Await, precedence);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').UpdateExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    UpdateExpression (expr, precedence, flags) {
        if (expr.prefix) {
            return parenthesize(
                [
                    expr.operator,
                    this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
                ],
                Precedence.Unary,
                precedence
            );
        }
        return parenthesize(
            [
                this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
                expr.operator
            ],
            Precedence.Postfix,
            precedence
        );
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').FunctionExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    FunctionExpression (expr, precedence, flags) {
        /** @type {NestedStringArray} */
        const result = [
            generateAsyncPrefix(expr, true),
            'function'
        ];
        if (expr.id) {
            result.push(generateStarSuffix(expr) || noEmptySpace());
            result.push(generateIdentifier(expr.id));
        } else {
            result.push(generateStarSuffix(expr) || space);
        }
        result.push(this.generateFunctionBody(expr));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ArrayPattern} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ArrayPattern (expr, precedence, flags) {
        return /** @type {CodeGenerator & CodeGenerator.Expression} */ (
            this
        ).ArrayExpression(expr, precedence, flags, true);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ArrayExpression|import('estree').ArrayPattern} expr
     * @param {number} precedence
     * @param {number} flags
     * @param {boolean} [isPattern]
     */
    ArrayExpression (expr, precedence, flags, isPattern) {
        if (!expr.elements.length) {
            return '[]';
        }
        const multiline = isPattern ? false : expr.elements.length > 1;
        /** @type {StringOrSourceNodeOrArray} */
        const result = ['[', multiline ? newline : ''];
        const that = this;
        withIndent(function (indent) {
            for (let i = 0, iz = expr.elements.length; i < iz; ++i) {
                if (!expr.elements[i]) {
                    if (multiline) {
                        result.push(indent);
                    }
                    if (i + 1 === iz) {
                        result.push(',');
                    }
                } else {
                    result.push(multiline ? indent : '');
                    result.push(that.generateExpression(
                        /** @type {import('estree').Node} */
                        (expr.elements[i]),
                        Precedence.Assignment,
                        E_TTT
                    ));
                }
                if (i + 1 < iz) {
                    result.push(`,${multiline ? newline : space}`);
                }
            }
        });
        if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(multiline ? base : '');
        result.push(']');
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').RestElement} expr
     * @param {number} precedence
     * @param {number} flags
     */
    RestElement(expr, precedence, flags) {
        return `...${this.generatePattern(expr.argument)}`;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ClassExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ClassExpression (expr, precedence, flags) {
        /** @type {NestedStringArray} */
        let result = ['class'];
        if (expr.id) {
            result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
        }
        if (expr.superClass) {
            const fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Unary, E_TTT));
            result = join(result, fragment);
        }
        result.push(space);
        result.push(this.generateStatement(expr.body, S_TFFT));
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').MethodDefinition} expr
     * @param {number} precedence
     * @param {number} flags
     */
    MethodDefinition (expr, precedence, flags) {
        /** @type {string[]} */
        let result = [];
        if (expr['static']) {
            result = [`static${space}`];
        }

        let fragment;
        if (expr.kind === 'get' || expr.kind === 'set') {
            fragment = [
                join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)),
                this.generateFunctionBody(expr.value)
            ];
        } else {
            fragment = [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
            ];
        }
        return join(result, fragment);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Property} expr
     * @param {number} precedence
     * @param {number} flags
     */
    Property (expr, precedence, flags) {
        if (expr.kind === 'get' || expr.kind === 'set') {
            return [
                expr.kind, noEmptySpace(),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(
                    /** @type {import('estree').FunctionExpression} */
                    (expr.value)
                )
            ];
        }

        if (expr.shorthand) {
            if (expr.value.type === 'AssignmentPattern') {
                // @ts-expect-error See comments under `Object.assign` of prototypes below
                return this.AssignmentPattern(expr.value, Precedence.Sequence, E_TTT);
            }
            return this.generatePropertyKey(expr.key, expr.computed);
        }

        if (expr.method) {
            return [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(
                    /** @type {import('estree').FunctionExpression} */
                    (expr.value)
                )
            ];
        }

        return [
            this.generatePropertyKey(expr.key, expr.computed),
            `:${space}`,
            this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
        ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ObjectExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ObjectExpression (expr, precedence, flags) {
        if (!expr.properties.length) {
            return '{}';
        }
        const multiline = expr.properties.length > 1;

        const that = this;

        /** @type {string | import('source-map').SourceNode} */
        let fragment = '';
        withIndent(function () {
            fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
        });

        if (!multiline) {
            // issues 4
            // Do not transform from
            //   dejavu.Class.declare({
            //       method2 () {}
            //   });
            // to
            //   dejavu.Class.declare({method2 () {
            //       }});
            if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                return [ '{', space, fragment, space, '}' ];
            }
        }

        /** @type {(string | import('source-map').SourceNode)[]} */
        let result = [];
        withIndent(function (indent) {
            result = [ '{', newline, indent, fragment ];

            if (multiline) {
                result.push(`,${newline}`);
                for (let i = 1, iz = expr.properties.length; i < iz; ++i) {
                    result.push(indent);
                    result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(`,${newline}`);
                    }
                }
            }
        });

        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(base);
        result.push('}');
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').AssignmentPattern} expr
     * @param {number} precedence
     * @param {number} flags
     */
    AssignmentPattern(expr, precedence, flags) {
        return this.generateAssignment(expr.left, expr.right, '=', precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ObjectPattern} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ObjectPattern (expr, precedence, flags) {
        if (!expr.properties.length) {
            return '{}';
        }

        let multiline = false;
        if (expr.properties.length === 1) {
            const [property] = expr.properties;
            if (
                property.type === Syntax.Property
                    && /** @type {import('estree').AssignmentProperty} */ (
                        property
                    ).value.type !== Syntax.Identifier
            ) {
                multiline = true;
            }
        } else {
            for (const property of expr.properties) {
                if (
                    property.type === Syntax.Property
                        && !(/** @type {import('estree').AssignmentProperty} */ (
                            property
                        )).shorthand
                ) {
                    multiline = true;
                    break;
                }
            }
        }

        /** @type {StringOrSourceNodeOrArray} */
        const result = ['{', multiline ? newline : '' ];

        const that = this;
        withIndent(function (indent) {
            for (let i = 0, iz = expr.properties.length; i < iz; ++i) {
                result.push(multiline ? indent : '');
                result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                if (i + 1 < iz) {
                    result.push(`,${multiline ? newline : space}`);
                }
            }
        });

        if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(multiline ? base : '');
        result.push('}');
        return result;
    },

    /**
     * @param {import('estree').ThisExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ThisExpression (expr, precedence, flags) {
        return 'this';
    },

    /**
     * @param {import('estree').Super} expr
     * @param {number} precedence
     * @param {number} flags
     */
    Super (expr, precedence, flags) {
        return 'super';
    },

    /**
     * @param {import('estree').Identifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    Identifier (expr, precedence, flags) {
        return generateIdentifier(expr);
    },

    /**
     * @param {import('estree').ImportDefaultSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ImportDefaultSpecifier (expr, precedence, flags) {
        return generateIdentifier(
            /* c8 ignore next 2 -- Guard */
            ('id' in expr && /** @type {{id: import('estree').Identifier}} */ (
                expr
            ).id) || expr.local
        );
    },

    /**
     * @param {import('estree').ImportNamespaceSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ImportNamespaceSpecifier (expr, precedence, flags) {
        const result = ['*'];
        const id = /** @type {import('estree').Identifier} */ (
            /* c8 ignore next -- Guard */
            'id' in expr && expr.id
        ) || expr.local;
        if (id) {
            result.push(`${space}as${noEmptySpace()}${generateIdentifier(id)}`);
        }
        return result;
    },

    /**
     * @param {import('estree').ImportSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ImportSpecifier (expr, precedence, flags) {
        // eslint-disable-next-line prefer-destructuring -- TS
        const imported = /** @type {import('estree').Identifier} */ (expr.imported);
        const result = [ imported.name ];
        const { local } = expr;
        if (local && local.name !== imported.name) {
            result.push(`${noEmptySpace()}as${noEmptySpace()}${generateIdentifier(local)}`);
        }
        return result;
    },

    /**
     * @param {import('estree').ExportSpecifier} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ExportSpecifier (expr, precedence, flags) {
        // eslint-disable-next-line prefer-destructuring -- TS
        const local = /** @type {import('estree').Identifier} */ (expr.local);
        const result = [ local.name ];
        // eslint-disable-next-line prefer-destructuring -- TS
        const exported = /** @type {import('estree').Identifier} */ (expr.exported);
        if (exported && exported.name !== local.name) {
            result.push(`${noEmptySpace()}as${noEmptySpace()}${generateIdentifier(exported)}`);
        }
        return result;
    },

    /**
     * @param {import('estree').Literal & {
     *   bigint?: string,
     *   regex?: {
     *     pattern: string,
     *     flags: string
     *   }
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    Literal (expr, precedence, flags) {
        let raw;
        if (Object.hasOwn(expr, 'raw') && parse && extra.raw) {
            try {
                raw = /** @type {import('estree').Directive} */ (
                    parse(/** @type {string} */ (expr.raw)).body[0]
                ).expression;
                if (raw.type === Syntax.Literal) {
                    if (raw.value === expr.value) {
                        return expr.raw;
                    }
                }
            // eslint-disable-next-line no-unused-vars -- Ok
            } catch (e) {
                // not use raw property
            }
        }

        if (expr.regex) {
            return `/${expr.regex.pattern}/${expr.regex.flags}`;
        }

        if (typeof expr.value === 'bigint') {
            return `${expr.value.toString()}n`;
        }

        // `expr.value` can be null if `expr.bigint` exists. We need to check
        // `expr.bigint` first.
        if (expr.bigint) {
            return `${expr.bigint}n`;
        }

        if (expr.value === null) {
            return 'null';
        }

        if (typeof expr.value === 'string') {
            return escapeString(expr.value);
        }

        if (typeof expr.value === 'number') {
            return generateNumber(expr.value);
        }

        if (typeof expr.value === 'boolean') {
            return expr.value ? 'true' : 'false';
        }

        return generateRegExp(/** @type {RegExp} */ (expr.value));
    },

    /**
     * @param {import('estree').Node} expr
     * @param {number} precedence
     * @param {number} flags
     */
    GeneratorExpression (expr, precedence, flags) {
        // @ts-expect-error See comments under `Object.assign` of prototypes below
        return this.ComprehensionExpression(expr, precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Node & {
     *   body: import('estree').Expression
     *   blocks: import('estree').Expression[]
     *   filter?: import('estree').Expression
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ComprehensionExpression (expr, precedence, flags) {
        // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
        // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6

        /** @type {NestedStringArray} */
        let result = (expr.type === Syntax.GeneratorExpression) ? ['('] : ['['];

        if (extra.moz.comprehensionExpressionStartsWithAssignment) {
            const fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
            result.push(fragment);
        }

        if (expr.blocks) {
            const that = this;
            withIndent(function () {
                for (let i = 0, iz = expr.blocks.length; i < iz; ++i) {
                    const fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                    if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                        result = join(result, fragment);
                    } else {
                        result.push(fragment);
                    }
                }
            });
        }

        if (expr.filter) {
            result = join(result, `if${space}`);
            const fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
            result = join(result, [ '(', fragment, ')' ]);
        }

        if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
            const fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);

            result = join(result, fragment);
        }

        result.push((expr.type === Syntax.GeneratorExpression) ? ')' : ']');
        return result;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').Node & {
     *   left: import('estree').VariableDeclaration|import('estree').Expression,
     *   of: boolean,
     *   right: import('estree').Expression
     * }} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ComprehensionBlock (expr, precedence, flags) {
        let fragment;
        if (expr.left.type === Syntax.VariableDeclaration) {
            fragment = [
                /** @type {import('estree').VariableDeclaration} */
                (expr.left).kind, noEmptySpace(),
                this.generateStatement(
                    /** @type {import('estree').VariableDeclaration} */
                    (expr.left).declarations[0],
                    S_FFFF
                )
            ];
        } else {
            fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
        }

        fragment = join(fragment, expr.of ? 'of' : 'in');
        fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));

        return [ `for${space}(`, fragment, ')' ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').SpreadElement} expr
     * @param {number} precedence
     * @param {number} flags
     */
    SpreadElement (expr, precedence, flags) {
        return [
            '...',
            this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
        ];
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').TaggedTemplateExpression} expr
     * @param {number} precedence
     * @param {number} flags
     */
    TaggedTemplateExpression (expr, precedence, flags) {
        let itemFlags = E_TTF;
        if (!(flags & F_ALLOW_CALL)) {
            itemFlags = E_TFF;
        }
        const result = [
            this.generateExpression(expr.tag, Precedence.Call, itemFlags),
            this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
        ];
        return parenthesize(result, Precedence.TaggedTemplate, precedence);
    },

    /**
     * @param {import('estree').TemplateElement} expr
     * @param {number} precedence
     * @param {number} flags
     */
    TemplateElement (expr, precedence, flags) {
        // Don't use "cooked". Since tagged template can use raw template
        // representation. So if we do so, it breaks the script semantics.
        return json ? JSON.stringify(expr.value.raw).slice(1, -1) : expr.value.raw;
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').TemplateLiteral} expr
     * @param {number} precedence
     * @param {number} flags
     */
    TemplateLiteral (expr, precedence, flags) {
        const safeConvertToJson = json && expr.quasis.length === 1;

        /** @type {(string | import('source-map').SourceNode)[]} */
        const result = [ safeConvertToJson ? '"' : '`' ];
        for (let i = 0, iz = expr.quasis.length; i < iz; ++i) {
            result.push(this.generateExpression(
                /** @type {import('estree').Expression} */
                (/** @type {unknown} */ (expr.quasis[i])),
                Precedence.Primary,
                E_TTT
            ));
            if (i + 1 < iz) {
                result.push(`\${${space}`);
                result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
                result.push(`${space}}`);
            }
        }
        result.push(safeConvertToJson ? '"' : '`');
        return result;
    },

    /**
     * @param {import('estree').Literal} expr
     * @param {number} precedence
     * @param {number} flags
     */
    ModuleSpecifier (expr, precedence, flags) {
        return this.Literal(expr, precedence, flags);
    },

    /**
     * @this {CodeGenerator}
     * @param {import('estree').ImportExpression} expr
     * @param {number} precedence
     * @param {number} flag
     */
    ImportExpression(expr, precedence, flag) {
        return parenthesize([
            'import(',
            this.generateExpression(expr.source, Precedence.Assignment, E_TTT),
            ')'
        ], Precedence.Call, precedence);
    }
};

class CodeGenerator {

    // Helpers.

    /**
     * @param {import('estree').Statement} stmt
     * @param {number} flags
     */
    maybeBlock (stmt, flags) {
        const noLeadingComment = !extra.comment || !stmt.leadingComments;

        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
            return [space, this.generateStatement(stmt, flags)];
        }

        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
            return ';';
        }

        const that = this;

        /** @type {NestedStringArray} */
        let result = [];
        withIndent(function () {
            result = [
                newline,
                addIndent(that.generateStatement(stmt, flags))
            ];
        });

        return result;
    }

    /**
     * @param {import('estree').Statement} stmt
     * @param {StringOrSourceNodeOrArray} result
     */
    maybeBlockSuffix (stmt, result) {
        const ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
            return [result, space];
        }
        if (ends) {
            return [result, base];
        }
        return [result, newline, base];
    }

    /**
     * @param {import('estree').Node} node
     * @param {number} [precedence]
     * @param {number} [flags]
     */
    generatePattern (node, precedence, flags) {
        if (node.type === Syntax.Identifier) {
            return generateIdentifier(/** @type {import('estree').Identifier} */ (node));
        }
        return this.generateExpression(/** @type {import('estree').Expression} */ (node), precedence, flags);
    }

    /**
     * @param {(import('estree').ArrowFunctionExpression|import('estree').FunctionExpression|
     *   import('estree').FunctionDeclaration) & {
     *   rest?: import('estree').Identifier,
     *   defaults?: import('estree').Node[]
     * }} node
     */
    generateFunctionParams (node) {
        /** @type {NestedStringArray} */
        let result;
        if (node.type === Syntax.ArrowFunctionExpression &&
                    !node.rest && (!node.defaults || node.defaults.length === 0) &&
                    node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
            // arg => { } case
            result = [
                generateAsyncPrefix(node, true),
                generateIdentifier(/** @type {import('estree').Identifier} */ (
                    node.params[0]
                ))
            ];
        } else {
            result = node.type === Syntax.ArrowFunctionExpression
                ? [generateAsyncPrefix(node, false)]
                : [];
            result.push('(');

            let hasDefault = false;
            if (node.defaults) {
                hasDefault = true;
            }
            for (let i = 0, iz = node.params.length; i < iz; ++i) {
                if (hasDefault && node.defaults && node.defaults[i]) {
                    // Handle default values.
                    result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
                } else {
                    result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
                }
                if (i + 1 < iz) {
                    result.push(`,${space}`);
                }
            }

            if (node.rest) {
                if (node.params.length) {
                    result.push(`,${space}`);
                }
                result.push('...');
                result.push(generateIdentifier(node.rest));
            }

            result.push(')');
        }

        return result;
    }

    /**
     * @param {import('estree').ArrowFunctionExpression|
     *   import('estree').FunctionExpression|
     *   import('estree').FunctionDeclaration} node
     */
    generateFunctionBody (node) {
        const result = this.generateFunctionParams(node);

        if (node.type === Syntax.ArrowFunctionExpression) {
            result.push(space);
            result.push('=>');
        }

        if ('expression' in node && node.expression) {
            result.push(space);
            /** @type {string | import('source-map').SourceNode | NestedStringArray} */
            let expr = this.generateExpression(
                /** @type {import('estree').Expression} */
                (node.body),
                Precedence.Assignment,
                E_TTT
            );
            if (expr.toString().charAt(0) === '{') {
                expr = ['(', expr, ')'];
            }
            result.push(expr);
        } else {
            result.push(this.maybeBlock(
                /** @type {import('estree').BlockStatement} */
                (node.body),
                S_TTFF
            ));
        }

        return result;
    }

    /**
     * @param {"in"|"of"} operator
     * @param {import('estree').ForInStatement|import('estree').ForOfStatement} stmt
     * @param {number} flags
     */
    generateIterationForStatement (operator, stmt, flags) {
        const that = this;

        /** @type {NestedStringArray} */
        let result = [`for${'await' in stmt && stmt.await ? `${noEmptySpace()}await` : ''}${space}(`];
        withIndent(function () {
            if (stmt.left.type === Syntax.VariableDeclaration) {
                withIndent(function () {
                    result.push(/** @type {import('estree').VariableDeclaration} */ (
                        stmt.left
                    ).kind + noEmptySpace());
                    result.push(that.generateStatement(
                        /** @type {import('estree').VariableDeclaration} */
                        (stmt.left).declarations[0],
                        S_FFFF
                    ));
                });
            } else {
                result.push(that.generateExpression(
                    /** @type {import('estree').Pattern} */
                    (stmt.left),
                    Precedence.Call,
                    E_TTT
                ));
            }

            result = join(result, operator);
            result = [join(
                result,
                that.generateExpression(stmt.right, Precedence.Assignment, E_TTT)
            ), ')'];
        });
        result.push(this.maybeBlock(stmt.body, flags));
        return result;
    }

    /**
     * @param {import('estree').Expression|import('estree').PrivateIdentifier} expr
     * @param {boolean} computed
     */
    generatePropertyKey (expr, computed) {
        const result = [];

        if (computed) {
            result.push('[');
        }

        const expression = this.generateExpression(expr, Precedence.Assignment, E_TTT);

        if (json && typeof expression === 'string' && expression[0] !== '"') {
            result.push('"');
            result.push(expression);
            result.push('"');
        } else {
            result.push(expression);
        }

        if (computed) {
            result.push(']');
        }

        return result;
    }

    /**
     * @param {import('estree').Pattern} left
     * @param {import('estree').Node} right
     * @param {import('estree').AssignmentOperator} operator
     * @param {number} precedence
     * @param {number} flags
     */
    generateAssignment (left, right, operator, precedence, flags) {
        if (Precedence.Assignment < precedence) {
            flags |= F_ALLOW_IN;
        }

        return parenthesize(
            [
                this.generateExpression(left, Precedence.Call, flags),
                space + operator + space,
                this.generateExpression(right, Precedence.Assignment, flags)
            ],
            Precedence.Assignment,
            precedence
        );
    }

    /**
     * @param {number} flags
     */
    semicolon (flags) {
        if (!semicolons && flags & F_SEMICOLON_OPT) {
            return '';
        }
        return ';';
    }

    /**
     * @param {import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration} expr
     * @param {number|undefined} precedence
     * @param {number|undefined} flags
     * @returns {string | import('source-map').SourceNode}
     */
    generateExpression (expr, precedence, flags) {
        const type = expr.type || Syntax.Property;

        if (extra.verbatim && Object.hasOwn(expr, extra.verbatim)) {
            return generateVerbatim(expr, precedence);
        }

        // @ts-expect-error See comments under `Object.assign` of prototypes below
        let result = this[type](expr, precedence, flags);
        let typeCast;
        if ('jsdoc' in expr && expr.jsdoc) {
            // eslint-disable-next-line prefer-destructuring -- TS
            const jsdoc = /** @type {import('@es-joy/jsdoccomment').JsdocBlock} */ (expr.jsdoc);
            typeCast = expr.type !== 'Property' && !jsdoc.endLine &&
                jsdoc.tags.some((tag) => {
                    return tag.tag === 'type';
                });
            if (typeCast) {
                result = ['(', result];
            }
            result = addJsdoc(/** @type {((stmt: import('@es-joy/jsdoccomment').JsdocBlock) => string)} */ (
                this.JsdocBlock
            )(jsdoc), result);
        }
        if (extra.comment) {
            result = addComments(expr, result);
        }

        if (typeCast) {
            result.push(')');
        }
        result = toSourceNodeWhenNeeded(result, expr);
        return result;
    }

    /**
     * @param {(import('estree').Node|import('estree').MaybeNamedClassDeclaration|import('estree').MaybeNamedFunctionDeclaration) & {
     *   jsdoc?: import('@es-joy/jsdoccomment').JsdocBlock
     * }} stmt
     * @param {number} flags
     */
    generateStatement (stmt, flags) {
        // @ts-expect-error See comments under `Object.assign` of prototypes below
        let result = this[stmt.type](stmt, flags);
        if (stmt.jsdoc && this.JsdocBlock) {
            result = addJsdoc(this.JsdocBlock(stmt.jsdoc), result);
        }

        // Attach comments

        if (extra.comment) {
            result = addComments(stmt, result);
        }

        const fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' &&  fragment.charAt(fragment.length - 1) === '\n') {
            result = sourceMap
                ? /** @type {import('source-map').SourceNode} */ (
                    toSourceNodeWhenNeeded(result)
                ).replaceRight(/\s+$/.source, '')
                : fragment.replace(/\s+$/, '');
        }

        return toSourceNodeWhenNeeded(result, stmt);
    }
}

/** @type {((stmt: import('@es-joy/jsdoccomment').JsdocBlock) => string)|null} */
CodeGenerator.prototype.JsdocBlock = null;

// Statements.

CodeGenerator.Statement = Statement;

// TypeScript unfortunately does not recognize this, so our `this` values are off;
//   setting them dynamically or even manually doesn't work
Object.assign(CodeGenerator.prototype, CodeGenerator.Statement);

// Expressions.

CodeGenerator.Expression = Expression;

// TypeScript unfortunately does not recognize this, so our `this` values are off;
//   setting them dynamically or even manually doesn't work
Object.assign(CodeGenerator.prototype, CodeGenerator.Expression);

/**
 * @param {import('estree').Node} node
 * @param {typeof codegenFactory} codegenFactory
 */
function generateInternal(node, codegenFactory) {
    const codegen = codegenFactory();
    if (isStatement(node)) {
        return codegen.generateStatement(node, S_TFFF);
    }

    if (isExpression(node)) {
        return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
    }

    throw new Error(`Unknown node type: ${node.type}`);
}

/**
 * @typedef {{
 *  file?: string,
 *  sourceContent?: string,
 *  indent: null,
 *  base: null,
 *  parse: null,
 *  comment: boolean,
 *  codegenFactory: () => CodeGenerator,
 *  format: {
 *    indent: {
 *      style: string,
 *      base: number,
 *      adjustMultilineComment: boolean
 *    },
 *    newline: string,
 *    space: string,
 *    json: boolean,
 *    renumber: boolean,
 *    hexadecimal: boolean,
 *    quotes: 'single'|'double'|'auto',
 *    escapeless: boolean,
 *    compact: boolean,
 *    parentheses: boolean,
 *    semicolons: boolean,
 *    safeConcatenation: boolean,
 *    preserveBlankLines: boolean
 *  },
 *  moz: {
 *    comprehensionExpressionStartsWithAssignment: boolean,
 *    starlessGenerator: boolean
 *  },
 *  sourceMap: null,
 *  sourceMapRoot: null,
 *  sourceMapWithCode: boolean,
 *  directive: boolean,
 *  raw: boolean,
 *  verbatim: null,
 *  sourceCode: null
 * }} GenerateOptions
 */

/**
 * @param {import('estree').Node} node
 * @param {GenerateOptions} options
 */
function generate(node, options) {
    const defaultOptions = getDefaultOptions();

    if (options != null) {
        // Obsolete options
        //
        //   `options.indent`
        //   `options.base`
        //
        // Instead of them, we can use `option.format.indent`.
        if (typeof options.indent === 'string') {
            defaultOptions.format.indent.style = options.indent;
        }
        if (typeof options.base === 'number') {
            defaultOptions.format.indent.base = options.base;
        }
        options = updateDeeply(defaultOptions, options);
        indent = options.format.indent.style;
        if (typeof options.base === 'string') {
            ({ base } = options);
        } else {
            base = stringRepeat(indent, options.format.indent.base);
        }
    } else {
        options = defaultOptions;
        indent = options.format.indent.style;
        base = stringRepeat(indent, options.format.indent.base);
    }
    ({
        json, renumber, escapeless, newline, space, parentheses, semicolons,
        safeConcatenation
    } = options.format);
    hexadecimal = json ? false : options.format.hexadecimal;
    quotes = json ? 'double' : options.format.quotes;
    if (options.format.compact) {
        newline = space = indent = base = '';
    }
    ({ directive, sourceMap, sourceCode, codegenFactory } = options);
    parse = json ? null : options.parse;
    preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
    extra = options;

    if (sourceMap && generate.sourceMapModule) {
        ({ SourceNode } = generate.sourceMapModule);
    }

    const result = generateInternal(node, codegenFactory);

    let pair;
    if (!sourceMap) {
        pair = { code: result.toString(), map: null };
        return options.sourceMapWithCode ? pair : pair.code;
    }


    pair = result.toStringWithSourceMap({
        file: options.file,
        sourceRoot: options.sourceMapRoot
    });

    if (options.sourceContent) {
        pair.map.setSourceContent(options.sourceMap,
            options.sourceContent);
    }

    if (options.sourceMapWithCode) {
        return pair;
    }

    return pair.map.toString();
}

/** @type {import('source-map')|null} */
generate.sourceMapModule = null;

const FORMAT_MINIFY = {
    indent: {
        style: '',
        base: 0
    },
    renumber: true,
    hexadecimal: true,
    quotes: 'auto',
    escapeless: true,
    compact: true,
    parentheses: false,
    semicolons: false
};

const FORMAT_DEFAULTS = getDefaultOptions().format;

const PrecedenceCopy = updateDeeply({}, Precedence);
const { attachComments } = estraverse;

export {
    CodeGenerator,
    generate,
    attachComments,
    PrecedenceCopy as Precedence,
    FORMAT_MINIFY,
    FORMAT_DEFAULTS
};

/* vim: set sw=4 ts=4 et tw=80 : */
