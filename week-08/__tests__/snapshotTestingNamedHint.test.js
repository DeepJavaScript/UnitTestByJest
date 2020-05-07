import { rendererLinkElement } from "../src/renderElement";

describe("render component", () => {
  it("render link element", () => {
    let url = 'https://titangene.github.io/';
    let linkName = 'Titangene Blog';
  
    let actual = rendererLinkElement(url, linkName);

    // expect(actual).toMatchSnapshot();
    // expect(actual).toMatchSnapshot();
    expect(actual).toMatchSnapshot('rendor Titangene Blog (First Test)');
    expect(actual).toMatchSnapshot('rendor Titangene Blog (Second Test)');
  });

  it("render link element", () => {
    let url = 'https://www.google.com/';
    let linkName = 'Google';
  
    let actual = rendererLinkElement(url, linkName);

    // expect(actual).toMatchSnapshot();
    // expect(actual).toMatchSnapshot();
    expect(actual).toMatchSnapshot('rendor Google (First Test)');
    expect(actual).toMatchSnapshot('rendor Google (Second Test)');
  });
});
