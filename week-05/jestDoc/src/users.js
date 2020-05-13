import axios from 'axios';

class Users {
  static all() {
    return axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => response.data);
  }
}

export default Users;