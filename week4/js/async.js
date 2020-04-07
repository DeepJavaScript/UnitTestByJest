let cities = [];

function initializeCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities.push("Taipei");
      cities.push("Taichung");
      resolve();
    }, 100);
  });
  console.log("initialize");
}

function clearCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities = [];
      resolve();
    });
  });

  console.log("cleanData");
}

function isCity(name) {
  return cities.includes(name);
}

export { initializeCityDatabase, clearCityDatabase, isCity };
