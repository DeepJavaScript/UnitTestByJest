import { shoppingList } from "./app.js"


test('the shopping list has beer on it', () => {
  expect(new Set(shoppingList)).toContain('beer');
  expect(shoppingList).toContain('beer');
  expect(shoppingList).toEqual([
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
  ]);
});