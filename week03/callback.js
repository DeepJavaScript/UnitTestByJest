export { fetchData };

function fetchData(callback) {
  setTimeout(() => {
    callback("peanut butter");
  }, 300);
}