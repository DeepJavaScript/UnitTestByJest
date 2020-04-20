const diff = require('jest-diff').default;
const {
  diffStringsUnified,
  diffLinesUnified
} = require('jest-diff');

console.log(diff);
console.log("----------------------");


const a1 = {a: {b: {c: 5}}};
const b1 = {a: {b: {c: 6}}};

console.log(diff(a1, b1));
console.log("----------------------");

const a2 = ['delete', 'common', 'changed from'];
const b2 = ['common', 'changed to', 'insert'];

console.log(diff(a2, b2));
console.log("----------------------");

const a3 = 'common\nchanged from';
const b3 = 'common\nchanged to';

console.log(diffStringsUnified(a3, b3));
console.log("----------------------");

const aLines = ['delete', 'common', 'changed from'];
const bLines = ['common', 'changed to', 'insert'];

console.log(diffLinesUnified(aLines, bLines));
console.log("----------------------");
