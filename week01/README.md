# Getting Started

First of all initial project of npm:
```
npm init -y
```

Install Jest after initial:
```
npm install --save-dev jest
```

Create a file sum.js in js folder, and write below code:
```JavaScript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Create a file sum.test.js in __tests__ for testing sum.js:
sum.test.js
```JavaScript
const sum = require('../js/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Open package.json, add script `test`:
```JSON
"scripts": {
  "test": "jest"
},
```

Last,let's run script `test` start testing:
```
npm run test
```
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/kofmexo8r2r31mra0rzq.png)

# Additional Configuration

Run below code to generate configuration file:
```
jest --init
```

* If you get error message: `bash: jest: command not found`, must install jest to global:
```
npm install jest --global
```

Else you only can create configuration file `jest.config.js` by yourself, the basic content follow:
```JavaScript
module.exports = {

}
```

# Using Babel

Install depend library:
```
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

Create configuration of Babel `babel.config.js` in root path of project, and write below code:
```JavaScript
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current', }, }, ],
  ],
};
```

Now you can modify content of ./js/sum.js and ./__tests__/sum.test.js to ES6 syntax:
./js/sum.js
```JavaScript
const sum = (a, b) => a + b;

export default sum;
```

./__tests__/sum.test.js
```JavaScript
import sum from '../js/sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

* If you write ES6 syntax but not use Babel then get below result when you run `test`:
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/6t6rbufbulmmkknwyacg.png)

# Using TypeScript
Generate configuration file of TypeScript:
```
tsc --init
```

Next, just install correspond preset of Babel:
```
npm install --save-dev @babel/preset-typescript
```

Add to `babel.config.js`:
```JavaScript
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current', }, }, ],
    '@babel/preset-typescript',
  ],
};
```

Create TypeScript and its testing file:
./ts/sum.ts
```TypeScript
const sum = (a: number, b: number): number => a + b;

export default sum;
```

./__tests__/sum.test.ts
```TypeScript
import sum from '../ts/sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

* If you would write test file with TypeScript, you have to install correspond type file:

```
npm install --save-dev @types/jest
```

Run test:
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/q5imwk4y5hohqwy0pehj.png)
