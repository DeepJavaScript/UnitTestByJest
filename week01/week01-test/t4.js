// 輸入 n 印出 1+2-3+4-5+6...n 的算式與總和

var readline = require('readline');


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sumOfPolynimal = require('./t4-module');
var recursiveAsyncReadLine = function () {
    rl.question('請輸入正整數:', function (input) {
        input = Number(input);


        if (isNaN(input) || (input < 0)) {
            console.log('Answer:白痴喔！不要亂打');
            recursiveAsyncReadLine();
            return;
        }
        var { displayOfAns, sum } = sumOfPolynimal(input);//for
        console.log(`Answer：${displayOfAns}=${sum}`);
        recursiveAsyncReadLine();

    });

};

recursiveAsyncReadLine();


