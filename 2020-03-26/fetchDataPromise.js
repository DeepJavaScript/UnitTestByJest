module.exports = {
  fetchData,
  fetchDataErr
};

function fetchData(callback) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('peanut butter')
    }, 500);
  })
}

function fetchDataErr(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
    }, 500);
  })
}
