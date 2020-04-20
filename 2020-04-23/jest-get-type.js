const getType = require('jest-get-type');

console.log(getType(null));
console.log(getType(undefined));
console.log(getType(true));
console.log(getType(false));
console.log(getType(123));
console.log(getType(12.3));
console.log(getType(0x123));
console.log(getType("123"));
console.log(getType(new Date()));
console.log(getType(new Function()));
console.log(getType(new RegExp()));
console.log(getType({}));
console.log(getType(new Promise(resolve => resolve()))); // object
console.log(getType(new Error())); // object