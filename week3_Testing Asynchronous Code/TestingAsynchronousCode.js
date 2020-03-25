export { fetchData, jestPromises }

fetchData(callback);

function fetchData(callback) {
  console.log('start');
  setTimeout(callback, 3000, 'peanut butter');
  console.log('end');
}

function callback(data) {
  return data;
}

function jestPromises() {
  const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('peanut butter');
      reject('Error');
    }, 3000);
  });
  return fetchData;
}
