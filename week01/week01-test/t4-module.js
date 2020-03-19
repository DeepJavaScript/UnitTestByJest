

function sumOfPolynimal(input) {
    var sum = 0;
    var displayOfAns = "";
    for (let i = 1; i <= input; i++) {
        if (i === 1) {
            sum = sum + i;
            displayOfAns = sum;
        }
        else if ((i % 2) === 0) {
            displayOfAns = displayOfAns + "+" + i;
            sum = sum + i;
        }
        else if ((i % 2) !== 0) {
            displayOfAns = displayOfAns + "-" + i;
            sum = sum - i;
        }
    } //for
    return { displayOfAns, sum };
}
module.exports = sumOfPolynimal;
