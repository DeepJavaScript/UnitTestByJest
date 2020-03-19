# Getting Started

## 建立環境
npm 初始
```
npm init -y
```

安裝 jest
```
npm install --save-dev jest
```
## 寫好 function
#### sum.js
```javascript=
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

## 加入測試檔
#### sum.test.js
```javascript=
//路徑依資料夾結構修改
const sum = require('./../sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

修改 `package.json`
```json=
{
  "scripts": {
    "test": "jest"
  }
}
```

執行測試
```
npm run test
```

## 加入Babel
jest 要能跑 ES6 語法需要加上 Babel

先把原本程式碼改成 ES6 語法
#### sum.js
```javascript=
const sum = (a, b) => {
	return a + b;
}
module.exports = sum;
```

#### sum.test.js
```javascript=
import sum from './../sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

執行測試
```
npm run test
```

會發現出錯
加 Babel 把 ES6 語法轉成 ES5 語法
```
npm install -D babel-jest @babel/core @babel/preset-env
```

建立 babel config 檔
#### babel.config.js
```javascript=
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

再次執行測試
```
npm run test
```

通過了～