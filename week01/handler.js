function handler(a, b) {
  try {
    const datas = [a, b];
    filterNumber(datas);
    return sum(datas);
  } catch (e) {
    return e.message;
  }
}

function filterNumber(datas) {
  const dataIsNumber = /\d/;
  const validate = datas.every((value) => dataIsNumber.test(value));
  if (!validate) throw Error("輸入的數值有誤，請輸入正確數值");
}

function sum(datas) {
  return datas.reduce((acc, cur) => {
    return acc + cur;
  });
}

module.exports = { handler, sum, filterNumber };
