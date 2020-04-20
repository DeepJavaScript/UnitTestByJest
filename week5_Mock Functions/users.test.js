import axios from 'axios';
import Users from './users';

jest.mock('axios');
// jest.mock(...) 函式自動模擬 axios 模塊。

it('返回假響應資料進行測試', () => {
  const users = [{ name: 'Bob', age: 26 }];
  const res = { data: users };

  // .get 提供一個 mockResolvedValue，它會返回假響應資料進行測試。
  axios.get.mockResolvedValue(res);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(res))
  return Users.all().then(data => expect(data).toEqual(users));
});