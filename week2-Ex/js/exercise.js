function sum(a, b) {
  return a + b;
}

function getObject(obj) {
  obj['test'] = 'new test';
  return obj;
}

function getBooleanValue(num) {
  if(num > 5) return true;
}

function getString(str) {
  return str.split('').reverse().join('');
}

function getArray(arr) {
  return arr;
}

function throwError() {
  throw new Error('you are using the wrong JDK');
}

export {
  sum,
  getObject,
  getBooleanValue,
  getString,
  getArray,
  throwError,
}