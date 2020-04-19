function sum(datas) {
  return datas.reduce((acc, cur) => {
    return acc + cur;
  });
}

// module.exports = sum;
export { sum };
