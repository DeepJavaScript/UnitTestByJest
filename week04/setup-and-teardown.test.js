describe("beforeEach AfterEach test", () => {
  let record = "";
  beforeEach(() => (record += "b"));
  afterEach(() => (record += "a"));
  test("record should be b", () => expect(record).toBe("b"));
  test("record should be bab", () => expect(record).toBe("bab"));
});

describe("beforeAll test", () => {
  let record = "";
  beforeAll(() => (record += "b"));
  afterAll(() => (record += "a"));
  test("record should be b", () => expect(record).toBe("b"));
  test("record should be b", () => expect(record).toBe("b"));
});
