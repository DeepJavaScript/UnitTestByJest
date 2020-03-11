# Week 01 - Get Started(Jest environment setting)

Node version: v12.16.1

## global install

### step 1 - install Jest globally

```
yarn global add jest --prefix /usr/local
```

## local install

### step1 - install Jest

```
yarn init
yarn add --dev jest
```

### step 2 - set script for running test to package.json

```
{
  "scripts": {
    "test": "jest"
  }
}
```

## Jest with babel

```
yarn add --dev babel-jest @babel/core @babel/preset-env
```

configure Babel to target current version of Node by creating config.js

```
// babel.config.js
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

- Notice the file should be located in the root

## Jest with TypeScript

```
yarn add typescript @babel/preset-typescript
```
