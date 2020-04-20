function forEach(items, callback, ary = []) {
  for (let index = 0; index < items.length; index++) {
    ary.push(callback(items[index]));
  }
  return ary;
}

function callback(item) {
  return Math.pow(item, 2);
}

const square = forEach([2, 4], callback);
console.log(square);

module.exports = { forEach };