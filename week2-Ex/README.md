# Using Matchers

## Install Jest using yarn:

```
yarn add --dev jest
```
## Install Jest using npm:

```
npm install --save-dev jest
```

## First test

```
//sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

## Add to your `package.json`

```
{
  "scripts": {
    "test": "jest"
  }
}
```

## Run your first test!

```
// use yarn
yarn test
```

```
// use npm
npm run test
```

## Additional Configuration

```
jest --init
```

It will gernerate a `jest.config.js` file in your project.

## Want to use ES6 method: `export` and `import`

### Using Babel

```
yarn add --dev babel-jest @babel/core @babel/preset-env
```

### Add babel.config.js

```
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

## Coverage report

![](https://i.imgur.com/snpFivv.png)

- Stmts: statements，是否每一個敘述句都已經執行?
- Branch: 是否每一個分支都已經執行?(Ex. if 敘述句，是否同時執行了 true and false?)
- Funcs: Functions: 是否每一個功能都已經執行?
- Lines: 是否每一行都已經執行?

### Coverage report index.html from coverage folder
![](https://i.imgur.com/4lE68Eh.png)

![](https://i.imgur.com/Gk7L9Uz.png)

- 1x: It means function `sum` execute one time.