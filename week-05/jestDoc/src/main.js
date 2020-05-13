import Users from '../src/users';

Users.all()
  .then(res => {
    console.log(res.data.map(user => user.username));
  });