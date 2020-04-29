export { fetchData };


function fetchData(param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      param ? resolve('peanut butter') : reject('Error')
    }, 300)
  })
}

