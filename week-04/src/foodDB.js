let foodDB = [];

function initFoodDB() {
  foodDB = [
    { city: 'Taipei', name: 'Apple' },
    { city: 'Tainan', name: 'Banana' }
  ];
}

function initFoodDBPromise() {
  return new Promise((resolve, reject) => {
    console.log(`--- Promise: init DB Start ---`);
    setTimeout(() => {
      foodDB = [
        { city: 'Taipei', name: 'Apple' },
        { city: 'Tainan', name: 'Banana' }
      ];
      resolve();
    }, 3000);
    console.log(`--- Promise: init DB End ---`);
  });
}

function clearFoodDB() {
  foodDB = [];
}

function clearFoodDBPromise() {
  return new Promise((resolve, reject) => {
    console.log(`--- Promise: clear DB Start ---`);
    setTimeout(() => {
      foodDB = [];
      resolve();
    }, 3000);
    console.log(`--- Promise: clear DB End ---`);
  });
}

function isValidCityFoodPair(foodCity, foodName) {
  return foodDB.some(food => (food.city === foodCity) && (food.name === foodName));
}

export {
  initFoodDB,
  initFoodDBPromise,
  clearFoodDB,
  clearFoodDBPromise,
  isValidCityFoodPair
}