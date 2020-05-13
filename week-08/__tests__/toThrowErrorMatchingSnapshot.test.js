class DisgustingFlavorError extends Error {}

function drinkFlavor(flavor) {
  if (flavor == "octopus") {
    throw new DisgustingFlavorError("yuck, octopus flavor");
  }
  console.log("drinkFlavor");
}

describe("toThrowErrorMatchingSnapshot", () => {
  it("throws on octopus", () => {
    function drinkOctopus() {
      drinkFlavor("octopus");
    }

    expect(drinkOctopus).toThrowErrorMatchingSnapshot();
  });

  it("throws on octopus", () => {
    function drinkOctopus() {
      drinkFlavor("octopus");
    }

    expect(drinkOctopus).toThrowErrorMatchingInlineSnapshot(
      `"yuck, octopus flavor"`
    );
  });
});
