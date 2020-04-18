import { matchers } from 'jest-json-schema';
expect.extend(matchers);
import { matchersWithOptions } from 'jest-json-schema';

// Local schema files are imported like normal. If you use TypeScript you
// will need to ensure `--resolveJsonModule` is enabled.
const schemaA = require('./schemaA.json');
const schemaB = require('./schemaB.json');

expect.extend(matchersWithOptions({
  // Loading in a schema which is comprised only of definitions,
  // which means specific test schemas need to be created.
  // This is good for testing specific conditions for definition schemas.
  schemas: [schemaA]
}));



test('schemaA is valid', () => {
  expect(schemaA).toBeValidSchema();
});

test('using schemaA to build a test schema to test a specific definition', () => {
  // This is a test schema which references a definition in one of the
  // pre-loaded schemas. This can allow us to write tests for specific
  // definitions.
  const testSchema = {
    $ref: 'schemaA#/definitions/testA'
  };

  expect(testSchema).toBeValidSchema();

  // Valid
  expect(1).toMatchSchema(testSchema);

  // This example runs through a number of values that we know don't match
  // the schema, ensuring that any future changes to the schema will require
  // the test to be updated.
  ['1', true, false, null, [], {}].forEach(value => {
    expect(value).not.toMatchSchema(testSchema);
  });
});

test('using schemaB which already references a definition in schemaA', () => {
  expect(schemaB).toBeValidSchema();

  // Valid
  ['', '1', null].forEach(value => {
    expect(value).toMatchSchema(schemaB);
  });

  // Invalid
  // ['1', true, false, [], {}].forEach(value => {
  //   console.log('value', value);
  //   console.log('schemaB', schemaB);
    
  //   expect(value).not.toMatchSchema(schemaB);
  // });
});

test('Test JSON Schema', () => {
  const json = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    "status":"published"
  };

  const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://jsonplaceholder.typicode.com/posts/1",
    "type": "object",
    "properties": {
        "userId": { "type": "number" },
        "id": { "type": "number" },
        "title": { "type": "string" },
        "body": { "type": "string" },
        "status": { "type": "string","enum": ["published", "saved"] },
    }
  };

  expect(json).toMatchSchema(schema);
});