module.exports = {
  serialize(val, config, indentation, depth, refs, printer) {
    return 'Pretty foo: ' + printer(val.foo);
  },
  test(val) {
    return val && val.hasOwnProperty('foo');
  }
};