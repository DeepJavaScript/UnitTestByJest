const diff = require('jest-diff').default;

const a = {a: {b: {c: 5}}};
const b = {a: {b: {c: 6}}};

const objDiff = diff(a, b);

console.log(objDiff);

const c = ['delete', 'common', 'changed from'];
const d = ['common', 'changed to', 'insert'];

const arrayDiff = diff(c, d);
console.log(arrayDiff);