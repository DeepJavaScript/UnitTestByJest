import { fetchData } from "../promise.js";

describe("測試約定 resolve 和 reject 回傳相異數值", () => {
  it("傳入 0 回傳 peanut butter", () => {
    return fetchData(2).then((response) => expect(response).toBe("peanut butter"));
  });
  it("傳入 true 回傳 peanut butter", () => {
    return fetchData(true).then((response) => expect(response).toBe("peanut butter"));
  });
  it("傳入 falsey 回傳 Error", () => {
    expect.assertions(1);
    return fetchData(0).catch((response) => expect(response).toBe("Error"));
  });
});

describe("簡易測試約定寫法：測試約定 resolve 和 reject 回傳相異數值", () => {
  it("傳入 2 回傳 peanut butter", () => {
    return expect(fetchData(2)).resolves.toBe("peanut butter");
  });
  it("傳入 true 回傳 peanut butter", () => {
    return expect(fetchData(true)).resolves.toBe("peanut butter");
  });
  it("傳入 falsey 回傳 Error", () => {
    return expect(fetchData(false)).rejects.toBe("Error");
  });
});

describe("測試中使用 async 語法配合 promise", () => {
  it("傳入 2 回傳 peanut butter", async () => {
    const data = await fetchData(2);
    expect(data).toBe("peanut butter");
  });
  it("傳入 true 回傳 peanut butter", async () => {
    const data = await fetchData(true);
    expect(data).toBe("peanut butter");
  });
  it("傳入 falsey 回傳 Error", async () => {
      try {
        await fetchData(false);
      } catch (e) {
        expect(e).toMatch("Error");
      }
    // const data = await fetchData(false);
    // expect(data).toBe("Error");
  });
});

describe("測試中 combine async and await with .resolves or .rejects", () => {
  it("傳入 2 回傳 peanut butter", async () => {
    await expect(fetchData(2)).resolves.toBe("peanut butter");
  });
  it("傳入 true 回傳 peanut butter", async () => {
    await expect(fetchData(true)).resolves.toBe("peanut butter");
  });
  it("傳入 falsey 回傳 Error", async () => {
    await expect(fetchData(false)).rejects.toBe("Error");
  });
});