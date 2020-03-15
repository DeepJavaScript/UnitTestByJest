import { matchers } from "jest-json-schema";
import { list } from "../js/list.json";

expect.extend(matchers);

test("test json format", () => {
  const schema = {
    type: "object",
    properties: {
      fruits: {
        type: "array",
        items: {
          type: "string"
        }
      },
      vegetables: {
        type: "array",
        items: {
          type: "object",
          required: ["veggieName", "veggieLike", "price"],
          properties: {
            price: {
              type: "number"
            }
          }
        }
      }
    }
  };
  expect(list).toMatchSchema(schema);
});
