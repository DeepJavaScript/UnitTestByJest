// return number
function sum(a, b) {
    return a + b;
}


// return object
function obj(a) {
    return a;
}

function str() {
    return `hello`;
}

function thowError() {
    throw new Error('you are using the wrong JDK');
}



module.exports = { sum, obj, str, thowError };