const diff = require('jest-diff');

const a = ['delete', 'common', 'changed from'];
const b = ['common', 'changed to', 'insert'];

const difference = diff.default(a, b);

console.log(difference)