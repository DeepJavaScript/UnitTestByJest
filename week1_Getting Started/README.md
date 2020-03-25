#### week1_Getting Started

1. 針對檔名以及格式初步研究，主要分為開發依賴 (devDependencies) 以及發佈環境 (dependencies)。
2. package-lock.json 彙整紀錄一份格式，可以了解建置環境中互相依賴情況。
3. 3A 用法，初始化、預期行為以及期望結果。

- module.exports = sum;，exports 物件，可以將 sum 轉換成模組，供其他使用。
- const sum = require('./sum');，require 提出請求，即可在 sum.test.js 使用模組。