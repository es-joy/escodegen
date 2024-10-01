import js from '@eslint/js';
import globals from 'globals';

export default [
    {
        ignores: [
            'benchmark/old.cjs',
            'lib',
            'coverage',
            'test/*/*.js',
            'dist'
        ]
    },
    js.configs.recommended,
    {
        files: ['*-node.js', 'benchmark/**', 'bin/**', 'tools/**', 'rollup.config.js'],
        languageOptions: {
            globals: globals.node
        }
    }, {
        files: ['test/**'],
        languageOptions: {
            globals: {
                expect: 'readonly',
                ...globals.mocha
            }
        }
    },
    {
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
            'template-curly-spacing': ['error'],
            'no-restricted-syntax': ['error', {
                selector: 'CallExpression[callee.type="MemberExpression"][callee.property.name="push"][callee.property.type="Identifier"][arguments.length>1]:not([callee.computed=true])',
                message: '"push" with multiple arguments hurts performance since optimizing compiler would not support it'
            }]
        }
    }
];
