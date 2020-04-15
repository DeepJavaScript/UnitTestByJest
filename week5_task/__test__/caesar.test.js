import caesar from '../js/caesar'
const moment = require('moment');

jest.mock('moment', () => () => ({
    format: () => {
      return 'xxxx-xx-xx'
    },
  }));

test('C caesar 1 to be D',()=>{
    expect(caesar('C',1)).toBe('D xxxx-xx-xx')
  })


  test('Hello caesar 10 to be D',()=>{
    expect(caesar('Hello',10)).toBe('Rovvy xxxx-xx-xx')
  })

  