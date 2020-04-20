// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users by mockResolvedValue', () => {
  const users = [{name: 'Bob'}];
  axios.get.mockResolvedValue({
    data: users
  });
  
  // console.log("mockResolvedValue: ", Object.keys(axios.get))

  return Users.all()
    .then(data => expect(data)
    .toEqual(users));
});

test('should fetch users by mockImplementation', () => {
  const users = [{name: 'Bob'}];
  axios.get.mockImplementation(() => Promise.resolve({
    data: users
  }))

  // console.log("mockImplementation: ", Object.keys(axios.get))

  return Users.all()
    .then(data => expect(data)
    .toEqual(users));
});

test('should fetch users by get = jest.fn', () => {
  const users = [{name: 'Bob'}];
  axios.get = jest.fn(() => Promise.resolve({
    data: users
  }))

  // console.log("mockImplementation: ", Object.keys(axios.get))

  return Users.all()
    .then(data => expect(data)
    .toEqual(users));
});
