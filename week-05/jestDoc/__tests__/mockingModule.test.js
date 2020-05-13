import axios from 'axios';
import Users from '../src/users';

jest.mock('axios');

test('should fetch users', () => {
  const expected = [{name: 'Titan'}];
  const response = {data: expected};
  axios.get.mockResolvedValue(response);
  
  // 或可用以下：
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(expected));
});