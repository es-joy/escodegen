import asts from './asts.js';
import escodegen from '../src/escodegen-node.js';

for (let j = 0; j < 50; j++) {
    for (const ast of asts) {
        escodegen.generate(ast);
    }
}
