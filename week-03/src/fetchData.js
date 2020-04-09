function fetchData(callback, type) {
  console.log(`--- fetchData: ${type} Start ---`);
  setTimeout(() => {
    callback('hi');
  }, 3000);
  console.log(`--- fetchData: ${type} End ---`);
}

function promiseFetchData(option) {
  return new Promise((resolve, reject) => {
    console.log(`--- Promise: Start ---`);
    setTimeout(() => {
      if (option.flag === 'success') resolve('hi');
      if (option.flag === 'fail') reject('error');
    }, 3000);
    console.log(`--- Promise: End ---`);
  });
}

export { fetchData, promiseFetchData };