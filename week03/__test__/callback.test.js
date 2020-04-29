import { fetchData } from "../callback.js";

test("the data is peanut butter 1", () => {
  function callback1(data) {
    expect(data).toBe("peanut butter");
  }

  fetchData(callback1);
});

test("the data is peanut butter 2", (done) => {
  function callback2(data) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback2);
});

describe("測試 callback", () => {
  it("錯的", () => {
    function callback3(data) {
      expect(data).toBe("peanut butter");
    }

    fetchData(callback3);
  });
  it("使用 done() 正確格式", (done) => {
    function callback4(data) {
      try {
        expect(data).toBe("peanut butter");
        done();
      }
      catch (error) {
        done(error);
      }
      fetchData(callback4);
    }
  });
},3000);
