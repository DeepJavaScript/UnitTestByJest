const {
  extract,
  strip,
  parse,
  parseWithComments,
  print,
} = require('jest-docblock');

const code2 = `
/**
 * Everything is awesome!
 *
 * @everything is:awesome
 * @flow
 */
 
 export const everything = Object.create(null);
 export default function isAwesome(something) {
   return something === everything;
 }
`;
 
const docblock = extract(code2);
console.log(docblock); // "/**\n * Everything is awesome!\n * \n * @everything is:awesome\n * @flow\n */"
console.log("-----------------");

console.log(strip(code2)); // "export const everything = Object.create(null);\n export default function isAwesome(something) {\n return something === everything;\n }"
console.log("-----------------");
 
const pragmas = parse(docblock);
console.log(pragmas); // { everything: "is:awesome", flow: "" }
console.log("-----------------");
console.log(parseWithComments(docblock)); // { comments: "Everything is awesome!", pragmas: { everything: "is:awesome", flow: "" } }
console.log("-----------------");
console.log(print({pragmas, comments: 'hi!'})); // /**\n * hi!\n *\n * @everything is:awesome\n * @flow\n */;
console.log("-----------------");
