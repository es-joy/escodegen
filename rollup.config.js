import { readFileSync } from 'fs';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

const { version } = JSON.parse(
    readFileSync(
        new URL('./package.json', import.meta.url)
    )
);

/**
 * @external RollupConfig
 * @type {PlainObject}
 * @see {@link https://rollupjs.org/guide/en#big-list-of-options}
 */

/**
 * @param {PlainObject} [config= {}]
 * @param {boolean} [config.minifying=false]
 * @param {string} [config.format="umd"]
 * @param {boolean} [config.node=false]
 * @returns {external:RollupConfig}
 */
function getRollupObject ({ minifying, format = 'umd', browser = false } = {}) {
    const nonMinified = {
        input: `src/escodegen-${browser ? 'browser' : 'node'}.js`,
        output: {
            format,
            sourcemap: true, // minifying,
            file: `dist/escodegen${
                format === 'cjs' ? '' : browser ? '-browser' : '-node'
            }${
                format === 'cjs' ? '' : `.${format}`
            }${minifying && format !== 'cjs' ? '.min' : ''}.${format === 'cjs' ? 'c' : ''}js`,
            name: 'escodegen'
        },
        plugins: [
            // Avoid for entry files which already reexport a version
            replace({
                'export {': `export const version = '${version}';\nexport {`,
                preventAssignment: true,
                delimiters: ['', ''],
                include: ['src/escodegen.js']
            }),
            resolve(),
            commonjs()
        ]
    };
    if (minifying) {
        nonMinified.plugins.push(terser());
    }
    return nonMinified;
}

export default [
    getRollupObject({ minifying: true, format: 'umd', browser: true }),
    getRollupObject({ minifying: true, format: 'cjs' }),
    getRollupObject({ minifying: true, format: 'esm', browser: true }),
    getRollupObject({ minifying: true, format: 'esm' })
];
