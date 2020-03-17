import * as testFn from '../js/exercise'
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

describe('Use matchers exercise', () => {
  test('Matcher: toBe, to match value.', () => {
    // Arrange
    let a = 1, b = 2;
    // Act
    let getValue = testFn.sum(a, b);
    // Assert
    expect(getValue).toBe(3);
  });

  test('Matcher: toEqual, to match object.', () => {
    // Arrange
    let obj = { test: 'test'};
    // Act
    let getValue = testFn.getObject(obj);
    // Assert
    expect(getValue).toEqual({ test: 'new test'});
  });
  
  test('Matcher: toBeTruthy, to match truthy', () => {
    // Arrange 
    let num = 6;
    // Act
    let getValue = testFn.getBooleanValue(num);
    // Assert 
    expect(getValue).toBeTruthy();
  });

  test(`Matcher: toBeGreaterThan, to match 
        receive value greater than expect value.`,
    () => {
      // Arrange
      let a = 3, b = 4;
      // Act
      let getValue = testFn.sum(a, b);
      // Assert
      expect(getValue).toBeGreaterThan(5);
    });

  test('Matcher: toBeCloseTo, to match floating point equality', () => {
    // Arrang
    let a = 0.1, b = 0.2;
    // Act 
    let getValue = testFn.sum(a, b);
    // Assert
    expect(getValue).toBeCloseTo(0.3);
  });


  test('Matcher: toMatch, to check string equality with regular expressions.', () => {
    // Arrang
    let str = '.txet si sihT';
    // Act 
    let getValue = testFn.getString(str);
    // Assert
    expect(getValue).toMatch(/text/);
  });

  test('Matcher: toMatchObject, to check string equality with regular expressions.', () => {
    // Arrang
    let arr = [
      { a: 123 },
      {
        b: 456,
        c: 789
      }
    ];
    // Act 
    let getValue = testFn.getArray(arr);
    // Assert
    expect(getValue).toMatchObject([
      { a: 123 },
      { b: 456 }
    ]);
  });

  test('Matcher: toContain, to check if an array or iterable contains a particular item.', () => {
    // Arrang
    let arr = ['beer'];
    // Act 
    let getValue = testFn.getArray(arr);
    // Assert
    expect(getValue).toContain('beer');
  }); 

  test('Matcher: toThrow, to test that a particular function throws an error when it\'s called.', () => {
    // Arrang

    // Act 
    
    // Assert
    expect(testFn.throwError).toThrow(Error);
    expect(testFn.throwError).toThrow('you are using the wrong JDK');
    expect(testFn.throwError).toThrow(/wrong/);
  }); 


  test('Matcher: toMatchSchema', () => {
    const schema = {
      properties:  {
        hello: {type: 'string'}
      },
      required: ['hello'],
    }
    expect({ hello: 'world'}).toMatchSchema(schema)
  });

})