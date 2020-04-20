# Jest Platform

## jest-changed-files

https://www.npmjs.com/package/jest-changed-files

在 git/hg 中，有改過的 repo 檔案路徑列表。

### `getChangedFilesForRoots`


```
getChangedFilesForRoots(roots: <Array<string>>, options: ?object): Promise<?object>
```

在 git/hg 中，與上次的 commit 比較，有改過的檔案路徑列表。

**參數**

- roots: 要檢查的路徑們，以 [jest 設定的根目錄](https://jestjs.io/docs/en/configuration#rootdir-string)為根目錄。
- options: 一個物件，可以設定 `lastCommit`、`withAncestor`
  - `lastCommit`: 
    - true 要看最後一次提交，有改哪些檔案？
    - false 現在與最後一次比較，有改哪些檔案？
  - `withAncestor`: (不知道是不是和自己有關)
  ```
  {
    lastCommit: boolean
    withAncestor: boolean
  }
  ```

**example:**

```shell
chris$ git log --stat 
commit 725afd9a813d13d14a7d6d0b3639a19a42022c3a (HEAD -> chris, origin/chris)
Author: chris <dwatow@gmail.com>
Date:   Mon Apr 20 14:04:29 2020 +0800

    add multi file

 2020-03-12/README.md                                      |  51 ++++++++
 2020-03-19/README.md                                      |  19 ++-
 2020-03-26/README.md                                      |  79 ++++++++++--
 2020-03-26/async.test.js                                  |  12 +-
 2020-03-26/fetchDataPromise.js                            |  10 +-
 2020-03-26/promises.test.js                               |  13 +-
 2020-04-10/README.md                                      |  55 +++++++-
 2020-04-10/only.test.js                                   |   4 +-
 2020-04-16/README.md                                      | 436 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2020-04-16/Users.js                                       |  11 ++
 2020-04-16/__snapshots__/mockFunctionMatcher.test.js.snap |  18 +++
 2020-04-16/emptyImplement.js                              |   3 +
 2020-04-16/emptyImplement.test.js                         |  44 +++++++
 2020-04-16/forEach.js                                     |   5 +
 2020-04-16/forEach.test.js                                |  18 +++
 2020-04-16/mock.test.js                                   |  56 +++++++++
 2020-04-16/mockFunctionMatcher.test.js                    |  46 +++++++
 2020-04-16/mockName.test.js                               |  11 ++
 2020-04-16/returnValue.test.js                            |  21 ++++
 2020-04-16/stub.test.js                                   |  17 +++
 2020-04-16/user.test.js                                   |  44 +++++++
 package-lock.json                                         |  31 +++++
 package.json                                              |   7 +-
 23 files changed, 976 insertions(+), 35 deletions(-)
```

```shell
chris$ node 2020-04-23/jest-changed-files.js 
{ 
  changedFiles: Set {
    '/Users/chris/code/UnitTestByJest/2020-03-12/README.md',
    '/Users/chris/code/UnitTestByJest/2020-03-19/README.md',
    '/Users/chris/code/UnitTestByJest/2020-03-26/README.md',
    '/Users/chris/code/UnitTestByJest/2020-03-26/async.test.js',
    '/Users/chris/code/UnitTestByJest/2020-03-26/fetchDataPromise.js',
    '/Users/chris/code/UnitTestByJest/2020-03-26/promises.test.js',
    '/Users/chris/code/UnitTestByJest/2020-04-10/README.md',
    '/Users/chris/code/UnitTestByJest/2020-04-10/only.test.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/README.md',
    '/Users/chris/code/UnitTestByJest/2020-04-16/Users.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/__snapshots__/mockFunctionMatcher.test.js.snap',
    '/Users/chris/code/UnitTestByJest/2020-04-16/emptyImplement.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/emptyImplement.test.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/forEach.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/forEach.test.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/mock.test.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/mockFunctionMatcher.test.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/mockName.test.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/returnValue.test.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/stub.test.js',
    '/Users/chris/code/UnitTestByJest/2020-04-16/user.test.js',
    '/Users/chris/code/UnitTestByJest/package-lock.json',
    '/Users/chris/code/UnitTestByJest/package.json' 
  },
  repos: { 
    git: Set { 
      '/Users/chris/code/UnitTestByJest' 
    }, 
    hg: Set {} 
  } 
}
```

### `findRepos`


```
findRepos(roots: <Array>): Promise<?object>
```

尋找 repo 的路徑

**參數**

- roots: 要檢查的路徑們，以 [jest 設定的根目錄](https://jestjs.io/docs/en/configuration#rootdir-string)為根目錄。

```shell
chris$ node 2020-04-23/jest-changed-files.js
{
  git: Set {
    '/Users/chris/code/UnitTestByJest'
  }, 
  hg: Set {}
}
```

## jest-diff

https://www.npmjs.com/package/jest-diff

可視化修改差異工具。

```javascript
const diff = require('jest-diff');
console.log(diff);
```

```shell
{ DIFF_DELETE: [Getter],
  DIFF_EQUAL: [Getter],
  DIFF_INSERT: [Getter],
  Diff: [Getter],
  diffLinesRaw: [Getter],
  diffLinesUnified: [Getter],
  diffLinesUnified2: [Getter],
  diffStringsRaw: [Getter],
  diffStringsUnified: [Getter],
  default: [Function: diff] }
```

### 比較兩個 JavaScript 的值。

```
diffDefault(a, b, options?)
```

正確的引用方式要這樣

```javascript
const diff = require('jest-diff').default

const a = ['delete', 'common', 'changed from'];
const b = ['common', 'changed to', 'insert'];
 
const difference = diff(a, b);
```

回傳值
分成兩個部份 註釋行 和 比較行

```shell
# 註釋行
- Expected
+ Received

# 比較行
  Array [
-   "delete",
    "common",
-   "changed from",
+   "changed to",
+   "insert",
  ]
```

### 逐字比較兩個字串

```
diffStringsUnified(a, b, options?)
```

```javascript
const a3 = 'common\nchanged from';
const b3 = 'common\nchanged to';

console.log(diffStringsUnified(a3, b3));
```

```shell
- Expected
+ Received

  common
- changed from
+ changed to
```

這個逐字比較的比較成本較高，在執行 Jest 時，若比較字串 > 20K
就使用逐行比較來進行，速度較快。

### 逐行比較兩個字串

```
diffLinesUnified(aLines, bLines, options?)
```

```javascript
const aLines = ['delete', 'common', 'changed from'];
const bLines = ['common', 'changed to', 'insert'];

console.log(diffLinesUnified(aLines, bLines));
```

```shell
- Expected
+ Received

- delete
  common
- changed from
+ changed to
+ insert
```

## jest-docblock

https://www.npmjs.com/package/jest-docblock

文件區塊: 實現程式碼內寫文件的極致表現

將檔案吃進來成為字串 (code2) 任用各種 API 吐出來，可以製作文件。

example:

```javascript
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
```

以下就示範什麼 API 吐出什麼內容

### `extract(contents: string): string`

Extracts a docblock from some file contents. Returns the docblock contained in contents. If contents did not contain a docblock, it will return the empty string ("").

```javascript
const docblock = extract(code2);
console.log(docblock); 
// "/**\n * Everything is awesome!\n * \n * @everything is:awesome\n * @flow\n */"
```

```shell
/**
 * Everything is awesome!
 *
 * @everything is:awesome
 * @flow
 */
```

### `strip(contents: string): string`

Strips the top docblock from a file and return the result. If a file does not have a docblock at the top, then return the file unchanged.

```javascript
console.log(strip(code2)); 
// "export const everything = Object.create(null);\n export default function isAwesome(something) {\n return something === everything;\n }"
```
 
```shell
 export const everything = Object.create(null);
 export default function isAwesome(something) {
   return something === everything;
 }
```

### `parse(docblock: string): {[key: string]: string | string[] }`

Parses the pragmas in a docblock string into an object whose keys are the pragma tags and whose values are the arguments to those pragmas.

```javascript
const pragmas = parse(docblock);
console.log(pragmas); // { everything: "is:awesome", flow: "" }
```

```shell
{ everything: 'is:awesome', flow: '' }
```

### `parseWithComments(docblock: string): { comments: string, pragmas: {[key: string]: string | string
[]} }`
Similar to parse except this method also returns the comments from the docblock. Useful when used with print().

```javascript
console.log(parseWithComments(docblock));
// { comments: "Everything is awesome!", pragmas: { everything: "is:awesome", flow: "" } }
```

### `print({ comments?: string, pragmas?: {[key: string]: string | string[]} }): string`

Prints an object of key-value pairs back into a docblock. If comments are provided, they will be positioned on the top of the docblock.

```shell
{ comments: 'Everything is awesome!',
  pragmas: { everything: 'is:awesome', flow: '' } }
```

```javascript
console.log(print({pragmas, comments: 'hi!'})); 
// /**\n * hi!\n *\n * @everything is:awesome\n * @flow\n */;
```

```shell
/**
 * hi!
 *
 * @everything is:awesome
 * @flow
 */
```

## jest-get-type

https://www.npmjs.com/package/jest-get-type

取得 JavaScript 的資料型別

```javascript
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
console.log(getType({})); // object
console.log(getType(new Promise(resolve => resolve()))); // object
console.log(getType(new Error())); // object
```

```shell
null
undefined
boolean
boolean
number
number
number
string
date
function
regexp
object
object
object
```

## jest-validate

https://www.npmjs.com/package/jest-validate

比對驗證之後，顯示警告、錯誤...等訊息。
也可以顯示正確的情況

```
validate((config: Object), (options: ValidationOptions)); // => {hasDeprecationWarnings: boolean, isValid: boolean}
```

example:

```javascript
const {validate} = require('jest-validate');

const configByUser = {
  transform: '<rootDir>/node_modules/my-custom-transform',
};

const result = validate(configByUser, {
  comment: '  Documentation: http://custom-docs.com',
  exampleConfig: {transform: '<rootDir>/node_modules/babel-jest'},
});

console.log(result);
```

```shell
chris$ node 2020-04-23/jest-validate.js 
{ hasDeprecationWarnings: false, isValid: true }
```

## jest-worker

https://www.npmjs.com/package/jest-worker

example:

```javascript
const JestWorker = require('jest-worker').default;

async function main() {
  const worker = new JestWorker(require.resolve('./heavy-task.js'));

  // run 2 tasks in parallel with different arguments
  const results = await Promise.all([
    worker.myHeavyTask(0),
    worker.myHeavyTask(1),
  ]);

  console.log(results);
}

main();
```

```shell
[ 10000, 10001 ]
# 程式沒有結束
```

## pretty-format

https://www.npmjs.com/package/pretty-format

有 pretty-format2 但是還在做。

輸出對人類讀取友善的程式排版。

```javascript
const prettyFormat = require('pretty-format');

const val = {object: {}};
val.circularReference = val;
val[Symbol('foo')] = 'foo';
val.map = new Map([['prop', 'value']]);
val.array = [-0, Infinity, NaN];

console.log(prettyFormat(val));
```

```shell
Object {
  "array": Array [
    -0,
    Infinity,
    NaN,
  ],
  "circularReference": [Circular],
  "map": Map {
    "prop" => "value",
  },
  "object": Object {},
  Symbol(foo): "foo",
}
```