import asts from './asts.js';
import escodegen from '../src/escodegen-node.js';

for (let j = 0; j < 50; j++) {
    for (let i = 0; i < asts.length; i++)
        escodegen.generate(asts[0]);
}
