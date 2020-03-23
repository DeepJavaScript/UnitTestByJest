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

export {
  result,
}