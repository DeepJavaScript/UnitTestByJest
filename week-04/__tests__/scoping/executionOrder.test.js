beforeAll(() => console.log('global: beforeAll'));
afterAll(() => console.log('global: afterAll'));

beforeEach(() => console.log('global: beforeEach'));
afterEach(() => console.log('global: afterEach'));

test('', () => console.log('global: test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('scope: beforeAll'));
  afterAll(() => console.log('scope: afterAll'));

  beforeEach(() => console.log('scope: beforeEach'));
  afterEach(() => console.log('scope: afterEach'));

  test('', () => console.log('scope: test'));
});

// global: beforeAll
// global: beforeEach
// global: test
// global: afterEach

// scope: beforeAll
// global: beforeEach
// scope: beforeEach
// scope: test
// scope: afterEach
// global: afterEach
// scope: afterAll

// global: afterAll