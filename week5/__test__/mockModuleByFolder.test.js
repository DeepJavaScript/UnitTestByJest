import member from '../js/member'

// 如果懶得寫這行，也可以改 config 檔案
jest.mock('../js/member')

test("member be fake",()=>{
  expect(member.name).toBe('fake member')
})