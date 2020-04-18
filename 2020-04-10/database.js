const initializeCityDatabase = (msg) => console.log(msg)
const clearCityDatabase = (msg) => console.log(msg)
const isCity = (msg) => {
  console.log("> run test " + msg)
  return true
}

const asyncInitializeCityDatabase = (msg) => {
  return new Promise((resolve, reject) => {
    console.log(msg);
    resolve()
  })
}

const initializeFoodDatabase = asyncInitializeCityDatabase;
const asyncInitializeFoodDatabase = asyncInitializeCityDatabase;
const isValidCityFoodPair = isCity;


module.exports = {
  initializeCityDatabase,
  clearCityDatabase,
  isCity,
  asyncInitializeCityDatabase,
  initializeFoodDatabase,
  asyncInitializeFoodDatabase,
  isValidCityFoodPair
}