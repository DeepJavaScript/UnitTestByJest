import { matchers } from 'jest-json-schema'
expect.extend(matchers)
const list = {
  fruits: ["apple", "orange", "pear"],
  vegetables: [
    {
      veggieName: "potato",
      veggieLike: true,
      price: 6
    },
    {
      veggieName: "broccoli",
      veggieLike: false,
      price: 8.8
    }
  ]
};

test('json schema', () => {
  const schema = {
    type: 'object',
    properties: {
      fruits: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      vegetables: {
        type: 'object',
        required: ['veggieName', 'veggieLike', 'price'],
        properties: {
          price: {
            type: 'number'
          }
        }
      }
    }
  }
})
