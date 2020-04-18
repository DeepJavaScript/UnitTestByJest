const code = `
/**
 * Everything is awesome!
 *
 * @everything is:awesome
 * @flow
 */

const test = "hello"
console.log(test)
`;

const {
  extract,
  strip,
  parse,
  parseWithComments,
  print,
} = require('jest-docblock');

const docblock = extract(code);
console.log(docblock); 

const stripped = strip(code);
console.log(stripped);

const pragmas = parse(docblock);
console.log(pragmas);

const parsed = parseWithComments(docblock);
console.log(parsed);

console.log(print({pragmas, comments: 'hi!'}));


test("test something to no error warning",()=>{
  expect(2).toBe(2)
})