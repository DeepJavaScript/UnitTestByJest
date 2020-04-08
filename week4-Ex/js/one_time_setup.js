let fruits;

function getFruitData() {
  return fruits = ['apple', 'pineapple', 'banana', 'lemon'];
}

function getTargetFruit(fruitIndex) {
  return fruits[fruitIndex];
}

function clearFruitData() {
  return fruits = [];
}

export {
  getFruitData,
  getTargetFruit,
  clearFruitData
}