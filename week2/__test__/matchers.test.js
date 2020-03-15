import { matchers } from 'jest-json-schema';
expect.extend(matchers);

// 非物件等於
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).toEqual(4);

});

// 物件等於，已遞迴的方式測試對象或是 Array
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});

// 不同
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});


// #Truthiness
test('null', () => {
  const n = null;
  expect(n).toBeNull(); // Null
  expect(n).toBeDefined(); // 非undefined
  expect(n).not.toBeUndefined(); // undefined
  expect(n).not.toBeTruthy(); // true
  expect(n).toBeFalsy(); // false
});

// #數字
// 什麼是 big integer values ?
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3); //大於
  expect(value).toBeGreaterThanOrEqual(3.5); //大於等於
  expect(value).toBeLessThan(5); //小於
  expect(value).toBeLessThanOrEqual(4.5); //小於等於

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// 因 0.1 + 0.2 === 0.30000000000000004，使用浮點數時，可以使用 toBeCloseTo
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);        -> error
  expect(value).toBeCloseTo(0.3);
});


// #字串
// 可以使用正則
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});


// #Arrays and iterables
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];
// toContain：可迭代的物件中是否包含某物？
test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});



// #Exceptions
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
});


// #其他
// #資料型別

test('to be Number',()=>{
  const number = 3;
  expect(number).toEqual(expect.any(Number));
})

const schema = {
  gender: expect.any(String),
  age: expect.any(Number),
  phone: expect.anything(),
  interests: expect.any(Array),
};

test('object containing', () => {
  const schema = {
    gender: expect.any(String),
    age: expect.any(Number),
    phone: expect.anything(),
    interests: expect.any(Array),
  };
  const data = {
    gender: 'female',
    age: 30,
    phone: '0987345672',
    interests: ['computer', 'guitar'],
    comments: 'Nothing to comment',
  };

  expect(data).toMatchObject(schema);  // PASS
  expect(data).toEqual(expect.objectContaining(schema))  // PASS
});

test('API format match schema',()=>{
  const apiData = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
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
    }
  }
  expect(apiData).toMatchSchema(schema);
})