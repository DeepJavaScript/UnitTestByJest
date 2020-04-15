# Mock Functions
使用 Mock Function 是為了要隔離其他的實作，使測試能夠更為純粹、針對 target。
主要有兩種方式：
1. creating a mock function to use in test code
2. writing a manual mock to override a module dependency

## Using a mock function

First, Need to know `jest.fn()`

### **`jest.fn(implementation)`**

Returns a new, unused [mock function](https://jestjs.io/docs/en/mock-function-api). Optionally takes a mock implementation. If no implementation is given, the mock function will return undefined when invoked.

```javascript
    const mockFn = jest.fn();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
    
    // With a mock implementation:
    const returnsTrue = jest.fn(() => true);
    console.log(returnsTrue()); // true;
```
 

### so, what is  [mock function](https://jestjs.io/docs/en/mock-function-api) ?

Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code, rather than only testing the output.

### Know some useful mock function

- **`mockFn.mock.calls`**

An array containing the call arguments of all calls that have been made to this mock function. Each item in the array is an array of arguments that were passed during the call.

For example: A mock function `f` that has been called twice, with the arguments `f('arg1', 'arg2')`, and then with the arguments `f('arg3', 'arg4')`, would have a `mock.calls` array that looks like this:

```javascript
    [
      ['arg1', 'arg2'],
      ['arg3', 'arg4'],
    ];
```

- **`mockFn.mock.results`**

An array containing the results of all calls that have been made to this mock function. Each entry in this array is an object containing a `type` property, and a `value` property. `type` will be one of the following:

- `'return'` - Indicates that the call completed by returning normally.
- `'throw'` - Indicates that the call completed by throwing a value.
- `'incomplete'` - Indicates that the call has not yet completed. This occurs if you test the result from within the mock function itself, or from within a function that was called by the mock.

The `value` property contains the value that was thrown or returned. `value` is undefined when `type === 'incomplete'`.

- **`mockFn.mock.instances`**

An array that contains all the object instances that have been instantiated from this mock function using `new`.

## Mock Return Values

Mock functions can also be used to inject test values into your code during a test

```javascript
    const filterTestFn = jest.fn();
    
    // Make the mock return `true` for the first call,
    // and `false` for the second call
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
    
    const result = [11, 12].filter(num => filterTestFn(num));
    
    console.log(result);
    // > [11]
    console.log(filterTestFn.mock.calls);
    // > [ [11], [12] ]
```

- try to avoid the temptation to implement logic inside of any function that's not directly being tested.

## Mocking Modules

If we need to  use axios to get API..

```javascript
    // users.js
    import axios from 'axios';
    
    class Users {
      static all() {
        return axios.get('/users.json').then(resp => resp.data);
      }
    }
    
    export default Users;
```

then we can use the jest.mock(...) function to automatically mock the axios module.

```javascript
    // users.test.js
    import axios from 'axios';
    import Users from './users';
    
    jest.mock('axios');
    
    test('should fetch users', () => {
      const users = [{name: 'Bob'}];
      const resp = {data: users};
      axios.get.mockResolvedValue(resp);
    
      // or you could use the following depending on your use case:
      // axios.get.mockImplementation(() => Promise.resolve(resp))
    
      return Users.all().then(data => expect(data).toEqual(users));
    });
```

### **`jest.mock(moduleName, factory, options)`**

- **`moduleName` 
欲 mock 的 module**
- **`factory`
將會替代 module 執行的程式碼**

```javascript
    jest.mock('../moduleName', () => {
      return jest.fn(() => 42);
    });
    
    // This runs the function specified as second argument to `jest.mock`.
    const moduleName = require('../moduleName');
    moduleName(); // Will return '42';
```

- **`options`**
The third argument can be used to create virtual mocks – mocks of modules that don't exist anywhere in the system

# **Mock Names**
除錯方便，可給 Name


## [Manual Mocks](https://jestjs.io/docs/en/manual-mocks)
用資料夾的方式，去 mock module，並定義資料。