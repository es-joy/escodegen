'use strict';

module.exports = {
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    env: {
        es2020: true
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
    },
    overrides: [{
        files: ['*-node.js', '.eslintrc.cjs', 'benchmark/**', 'bin/**', 'tools/**', 'rollup.config.js'],
        env: {
            node: true
        }
    }, {
        files: '.eslintrc.js',
        parserOptions: {
            sourceType: 'script'
        },
        rules: {
            strict: 'error'
        }
    }, {
        files: 'test/**',
        globals: {
            expect: true
        },
        env: {
            mocha: true
        }
    }],
    rules: {
        // 'push-with-multiple-arguments': 2,
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        'new-cap': [
            2,
            {
                capIsNew: false
            }
        ],
        semi: ['error'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'prefer-const': ['error'],
        'no-var': ['error'],
        'prefer-destructuring': ['error'],
        'object-shorthand': ['error'],
        'object-curly-spacing': ['error', 'always'],
        quotes: ['error', 'single'],
        'quote-props': ['error', 'as-needed'],
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'prefer-template': ['error'],
        'template-curly-spacing': ['error']
    }
};
