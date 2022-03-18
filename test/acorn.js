import * as acorn from 'acorn';
import { getRunTest } from './utils.js';

BigInt.prototype.toJSON = function() {
    return this.toString();
};

const data = {
    'BigInt Literals': {
        '1234567890n': {
            type: 'Program',
            start: 0,
            end: 11,
            body: [
                {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 11,
                    expression: {
                        type: 'Literal',
                        start: 0,
                        end: 11,
                        value: 1234567890,
                        raw: '1234567890n',
                        bigint: '1234567890'
                    }
                }
            ],
            sourceType: 'module'
        }
    }
};

const runTest = getRunTest(acorn, {
    // comment: false,
    ranges: false,
    locations: false,
    ecmaVersion: 2020
});

describe('acorn tests', function () {
    Object.keys(data).forEach(function (category) {
        it(category, function () {
            Object.keys(data[category]).forEach(function (source) {
                const expected = data[category][source];
                runTest(source, expected);
            });
        });
    });
});
