import { rendererMediaElement } from "../src/renderElement";

// jest.mock("../src/renderElement");

// 故意讓 `describe` 內的兩個 `it` 是一樣的測試名稱，
// 共有 4 個 `it`，都是用 `toMatchSnapshot()` matcher，
// 預期生成的 snapshot 檔案內會有 4 個 snapshot，
// snapshot 名稱都是會以 `render media element` 為前綴，
// 後面

describe("render component", () => {
  it("render media element", () => {
    const link = {
      url: "https://titangene.github.io/",
      name: "Titangene Blog",
    };
    const image = {
      url: "https://titangene.github.io/logo.png",
      alt: "Titangene Blog Logo",
    };

    let actual = rendererMediaElement(link, image);

    expect(actual).toMatchSnapshot();
    expect(actual).toMatchSnapshot();
    // expect(actual).toMatchSnapshot('rendor Titangene Blog (First Test)');
    // expect(actual).toMatchSnapshot('rendor Titangene Blog (Second Test)');
  });

  it("render media element", () => {
    const link = {
      url: "https://www.google.com.tw/",
      name: "Google",
    };
    const image = {
      url: "https://www.google.com.tw/logo.png",
      alt: "Google Logo",
    };

    let actual = rendererMediaElement(link, image);

    expect(actual).toMatchSnapshot();
    expect(actual).toMatchSnapshot();
    // expect(actual).toMatchSnapshot('rendor Google (First Test)');
    // expect(actual).toMatchSnapshot('rendor Google (Second Test)');
  });
});
