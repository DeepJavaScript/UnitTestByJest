function fetchDataNotPromise(callbackFunction) {
  console.log("start")
  setTimeout(function() {
    callbackFunction('some data');
  }, 1000);
  console.log("end")
}

function fetchDataReturnPromise() {
  console.log("start")
  const promiseTest = new Promise(function(resolve, reject) {
    setTimeout(function() {
      // resolve('some data');
      reject('something error');
    }, 1000);
  });
  return promiseTest
}

module.exports =  {fetchDataNotPromise,fetchDataReturnPromise};
