import {
  fetchData,
  fetchDataPromise,
  fetchDataPromiseWithErrorMessage
} from "../js/test";

//callback
test("the data is peanut butter", () => {
  function callback(data) {
    expect(data).toBe("peanut butter");
  }

  fetchData(callback);
});

test("the data is peanut butter", done => {
  function callback(data) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

//promise
test("the data is peanut butter", () => {
  return fetchDataPromise().then(data => {
    expect(data).toBe("peanut butter");
  });
});

test("the fetch fails with an error", () => {
  expect.assertions(1);
  return fetchDataPromiseWithErrorMessage().catch(e =>
    expect(e).toMatch("error")
  );
});

//.resolve/ .reject
test("the data is peanut butter", () => {
  return expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", () => {
  return expect(fetchDataPromiseWithErrorMessage()).rejects.toMatch("error");
});

//async /await
test("the data is peanut butter", async () => {
  const data = await fetchDataPromise();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchDataPromiseWithErrorMessage();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

// async / await with .resolves/.rejects
test("the data is peanut butter", async () => {
  await expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchDataPromiseWithErrorMessage()).rejects.toMatch("error");
});
