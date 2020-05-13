module.exports = {
  myHeavyTask: args => {
    for (let i = 0; i < 100; i++) {
      args++
    }
    return args;
  }
};