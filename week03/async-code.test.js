const asyncPassByCallback = (rate) => (cb) => {
  const result = Math.random() <= rate;
  setTimeout(cb(result || new Error()));
};
const asyncPassByPromise = (rate) => {
  const result = Math.random() <= rate;
  return new Promise((resolve, reject) => (result ? resolve : reject)(result));
};
test("try catch", (done) => {
  const cb = (res) => {
    try {
      expect(res).toBe(true);
      done();
    } catch (err) {
      done(err);
    }
  };
  asyncPassByCallback(1)(cb);
});

test("return promise", () => {
  return asyncPassByPromise(1);
});

test("rejects resolves method", () => {
  return expect(asyncPassByPromise(1)).resolves.toBe(true);
});

test("async await", async () => {
  const result = await asyncPassByPromise(1);
  expect(result).toBe(true);
});
