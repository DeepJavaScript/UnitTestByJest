const fetchData = callback => {
  setTimeout(() => {
    callback('data');
  }, 3000);
}

function callback(data) {
  // dosomething here...
  // console.log('data');
}

fetchData(callback);

const promiseObj = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Time\'s up!');
    },2000)
  })
}


export {
  fetchData,
  promiseObj,
}