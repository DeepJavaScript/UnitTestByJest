function compileAndroidCode() {
  throw new Error("you are using the wrong JDK");
}

function sum(datas) {
  return datas.reduce((acc, cur) => {
    return acc + cur;
  });
}

module.exports = { sum, compileAndroidCode };
