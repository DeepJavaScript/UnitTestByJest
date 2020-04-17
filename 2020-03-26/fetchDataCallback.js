module.exports = fetchData;

function fetchData(callback) {
  setTimeout(() => {
    callback('peanut butter')
  }, 500);
}
