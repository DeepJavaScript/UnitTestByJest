let cities = [];

function initializeCityDatabase() {
  cities.push("Taipei");
  cities.push("Taichung");
  console.log("initialize");
}

function clearCityDatabase() {
  cities = [];
  console.log("cleanData");
}

function isCity(name) {
  return cities.includes(name);
}

export { initializeCityDatabase, clearCityDatabase, isCity };
