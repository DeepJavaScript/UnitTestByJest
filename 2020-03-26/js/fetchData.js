const fetchData = (callBack, type) => {
  console.log(`--- fetchData: ${type} Start ---`)
  setTimeout(() => {
    callBack('peanut butter')
  }, 3000)
  console.log(`--- fetchData: ${type} End ---`)
}

const promise = (type, flag) => {
  console.log(`--- Promise ${type}: Start ---`)
  const promiseObj = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag) resolve('peanut butter');
      if (!flag) reject('error');
    }, 3000);
  });
  return promiseObj
}

module.exports = {
  fetchData,
  promise
}