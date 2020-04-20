module.exports = {
  myHeavyTask: args => {
    for (let index = 0; index < 10000; index++) {
      args += 1
    }
    return args
  },
};