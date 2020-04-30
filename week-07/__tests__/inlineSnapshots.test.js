import rendererLinkElement from "../src/linkElement";

describe("inline snapshots", () => {
  it("render the link element of the Titangene Blog home page", () => {
    let url = "https://titangene.github.io/";
    let linkName = "Titangene Blog";

    let actual = rendererLinkElement(url, linkName);

    expect(actual).toMatchInlineSnapshot();
  });
});
