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

export {
  sum,
  getObject,
  getBooleanValue,
}