Week 06：Jest Platform
===

選擇 Jest 的特定功能並作為獨立套件。

## [jest-changed-files](https://github.com/facebook/jest/tree/master/packages/jest-changed-files)

檢查自上次在 git 或 hg repo 中提交以來，有哪些已變更的檔案。

### getChangedFilesForRoots

```javascript
getChangedFilesForRoots(roots: <Array<string>>, options: ?object): Promise<?object>
```

回傳一個 promise，該 promise 會 resolve 已變更檔案和 repo 的物件。

Parameters：
- `roots`：從 [jest 的 `roots`](https://jestjs.io/docs/en/configuration#roots-arraystring) 收集的字串路徑的 array
- `options`：物件
  - `lastCommit: boolean`
    - `true`：等同於 `git show --name-only --pretty=format:HEAD^` 的輸出 (參考至原始碼 [facebook/jest 的 `packages/jest-changed-files/git.ts`](https://github.com/facebook/jest/blob/master/packages/jest-changed-files/src/git.ts#L48))
    - `false`：
  - `withAncestor: boolean`
    - `true`：等同於 `HEAD^` (參考至原始碼 [facebook/jest 的 `packages/jest-changed-files/git.ts`](https://github.com/facebook/jest/blob/master/packages/jest-changed-files/src/git.ts#L39))
    - `false`：`changedSince` 的值
  - `changedSince: string`
    - 指定 commit SHA-1 值，代表要從該 commit 至最新的 commit 有哪些已變更檔案和 repo
    - 等同於執行以下指令取得這些 repo 資訊：
      - committed：`git log --name-only --pretty=format:HEAD ^<commit>`
      - staged：`git diff --cached --name-only`
      - unstaged：`git ls-files --other --modified --exclude-standard`
    - 若未設定 `changedSince` 等同於執行取得這些 repo 資訊：同上面的 staged 和 unstaged
    - 若 `lastCommit` 為 `true` 時，不用使用 `changedSince`
  - `includePaths: Array<string>`
    - 過濾路徑
    - 路徑很像不能用 `*`

```javascript
const { getChangedFilesForRoots } = require('jest-changed-files');

// 最後一個 commit 的變更檔案與 repo
getChangedFilesForRoots(['./'], {
  lastCommit: true,
}).then(result => console.log(result.changedFiles));

// 最後一個 commit 的變更檔案與 repo，並過濾路徑
getChangedFilesForRoots(['./'], {
  lastCommit: true,
  includePaths: ['./week-04/__tests__']
}).then(result => console.log(result.changedFiles));

// 指定 commit 至最後一個 commit 的變更檔案與 repo，並過濾路徑
getChangedFilesForRoots(['./'], {
  changedSince: '80dba53'
  includePaths: ['./week-04/__tests__']
}).then(result => console.log(result));
```

```javascript
// jest-changed-files.js
const { getChangedFilesForRoots, findRepos } = require('jest-changed-files');

getChangedFilesForRoots(['./'], {
  lastCommit: true,
  // withAncestor: true
  // changedSince: '80dba53',
  includePaths: ['./week-04/src']
}).then(result => console.log(result));
```

輸出：

```
{
  changedFiles: Set {
    '/home/titan/project/jest/UnitTestByJest/week-04/src/cityDB.js',
    '/home/titan/project/jest/UnitTestByJest/week-04/src/foodDB.js'
  },
  repos: {
    git: Set { '/home/titan/project/jest/UnitTestByJest' },
    hg: Set {}
  }
}
```

### findRepos

```javascript
findRepos(roots: <Array>): Promise<?object>
```

回傳一個 promise，該 promise 會 resolve 指定路徑中包含的那些 repo。

Parameters：
- `roots`：從 [jest 的 `roots`](https://jestjs.io/docs/en/configuration#roots-arraystring) 收集的字串路徑的 array

```javascript
// jest-changed-files.js
const { findRepos } = require('jest-changed-files');

findRepos(['./']).then(repos => console.log(repos));
```

輸出：

```
{
  git: Set { '/home/titan/project/jest/UnitTestByJest' },
  hg: Set {}
}
```

## [jest-diff](https://github.com/facebook/jest/tree/master/packages/jest-diff)

視覺化資料變更

export 比較任何型別的兩個值的函數，並回傳 "pretty-print" 的字串，說明兩個參數之間的差異。

兩個命名的 export 逐字元比較字串：
- `diffStringsUnified`：回傳字串
- `diffStringsRaw`：回傳 `Diff` 物件的陣列

三個命名的 export 逐行比較字串陣列：
- `diffLinesUnified`、`diffLinesUnified2`：回傳字串
- `diffLinesRaw`：回傳 `Diff` 物件的陣列

### 預設 export

指定 JS 值，`diffDefault(a, b, options?)` 會執行以下操作：
1. 使用 `pretty-format` 套件將值序列化為字串
2. 使用 `diff-sequences` 套件逐行比較字串
3. 使用 `chalk` 套件格式化 changed 或 common lines 的格式

要使用此函數可用兩種方式：
- CommonJS modules：`const diffDefault = require('jest-diff').default`
- ECMAScript modules：`import diffDefault from 'jest-diff'`

```javascript
// jest-diff.js
const diff = require('jest-diff');

const a = {a: {b: {c: 5}}};
const b = {a: {b: {c: 6}}};

const result = diff(a, b);

// print diff
console.log(result);
```

輸出：

```diff
- Expected
+ Received

  Object {
    "a": Object {
      "b": Object {
-       "c": 5,
+       "c": 6,
      },
    },
  }
```

## [jest-docblock](https://github.com/facebook/jest/blob/master/packages/jest-docblock)

提取和解析 JS 檔案最上面的註解

export 各種函數來處理註解區塊中的資料

```javascript
// jest-docblock.js
const {parseWithComments} = require('jest-docblock');

const code = `
/**
 * This is a sample
 *
 * @flow
 */
 
 console.log('Hello World!');
`;

const parsed = parseWithComments(code);

// prints an object with two attributes: comments and pragmas.
console.log(parsed);
```

輸出：

```
{ comments:
   '/**\nThis is a sample\n\n/\n \n console.log(\'Hello World!\');',
  pragmas: [Object: null prototype] { flow: '' } }
```

## [jest-get-type](https://github.com/facebook/jest/blob/master/packages/jest-get-type/src/index.ts)

取得任何 JS 值的 primitive 型別的模組

export 一個函數，回傳一個字串，該字串為傳遞的參數值的型別

```javascript
// jest-get-type.js
const getType = require('jest-get-type');

const array = [1, 2, 3];
const nullValue = null;
const undefinedValue = undefined;

// prints 'array'
console.log(getType(array));
// prints 'null'
console.log(getType(nullValue));
// prints 'undefined'
console.log(getType(undefinedValue));
```

## [jest-validate](https://github.com/facebook/jest/tree/master/packages/jest-validate)

驗證使用者提交 (submitted) 的配置

export 帶有兩個 argument 的函數：使用者的配置和包含範例配置和其他 option 的物件。回傳值為一個具有兩個屬性的物件：
- `hasDeprecationWarnings`：指定提交 (submitted) 的配置是否具有棄用警告的 boolean
- `isValid`：指定配置是否正確的 boolean

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

輸出：

```
{ hasDeprecationWarnings: false, isValid: true }
```

## [jest-worker](https://github.com/facebook/jest/blob/master/packages/jest-worker)

用於任務平行化 (parallelization) 的模組。export 一個採用 Node.js 模組路徑的 class `Worker`，並讓您像呼叫 class 方法一樣呼叫模組的 export 方法，返回一個 promise，當指定的方法在 forked process 中完成其執行時，它會 resolve。

```javascript
// heavy-task.js

module.exports = {
  myHeavyTask: args => {
    // long running CPU intensive task.
  },
};
```

## [pretty-format](https://github.com/facebook/jest/blob/master/packages/pretty-format)

export 將任何 JS 值轉成人類可讀的字串的函數

支援 JS 內建的型別，並允許透過使用者定義的 plugin 擴充特定於應用程式的型別

```javascript
const prettyFormat = require('pretty-format');

const val = {object: {}};
val.circularReference = val;
val[Symbol('foo')] = 'foo';
val.map = new Map([['prop', 'value']]);
val.array = [-0, Infinity, NaN];

console.log(prettyFormat(val));
```

輸出：

```
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
