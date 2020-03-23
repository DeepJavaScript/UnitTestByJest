function fetchDataNotPromise(callbackFunction) {
  console.log("start")
  setTimeout(function() {
    callbackFunction('peanut butter');
  }, 1000);
  console.log("end")
}

function fetchDataReturnPromise() {
  console.log("start")
  const promiseTest = new Promise(function(resolve, reject) {
    setTimeout(function() {
      // resolve('peanut butter');
      reject('something error');
    }, 1000);
  });
  return promiseTest
}

module.exports =  {fetchDataNotPromise,fetchDataReturnPromise};
