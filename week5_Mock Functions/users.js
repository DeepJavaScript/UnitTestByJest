import axios from 'axios';

// 在 ES6 中可以透過 class 來建立 constructor
export default class Users {
  static all() {
    return axios
      .get("https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json")
      .then(res => res.data);
  }
}
