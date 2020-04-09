let cityDB = [];

function initCityDB() {
  cityDB = ['Taipei', 'Tainan'];
}

function initCityDBPromise() {
  return new Promise((resolve, reject) => {
    console.log(`--- Promise: init DB Start ---`);
    setTimeout(() => {
      cityDB = ['Taipei', 'Tainan'];
      resolve();
    }, 3000);
    console.log(`--- Promise: init DB End ---`);
  });
}

function initCityDBCallback(callback) {
  console.log(`--- callback: init DB Start ---`);
  setTimeout(() => {
    cityDB = ['Taipei', 'Tainan'];
    callback();
  }, 3000);
  console.log(`--- callback: init DB End ---`);
}

function clearCityDB() {
  cityDB = [];
}

function clearCityDBPromise() {
  return new Promise((resolve, reject) => {
    console.log(`--- Promise: clear DB Start ---`);
    setTimeout(() => {
      cityDB = [];
      resolve();
    }, 3000);
    console.log(`--- Promise: clear DB End ---`);
  });
}

function clearCityDBCallback(callback) {
  console.log(`--- callback: clear DB Start ---`);
  setTimeout(() => {
    cityDB = [];
    callback();
  }, 3000);
  console.log(`--- callback: clear DB End ---`);
}

function isCity(city) {
  return cityDB.includes(city);
}

function addCity(city) {
  cityDB.push(city);
}

export {
  initCityDB,
  initCityDBPromise,
  initCityDBCallback,
  clearCityDB,
  clearCityDBPromise,
  clearCityDBCallback,
  isCity,
  addCity
}