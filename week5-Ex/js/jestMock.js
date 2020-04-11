
// 測試需求: mock axios modules
import axios from 'axios';


async function getStations() {
  try {
    const endpoint = 'https://data.kcg.gov.tw/dataset/a98754a3-3446-4c9a-abfc-58dc49f2158c/resource/48d4dfc4-a4b2-44a5-bdec-70f9558cd25d/download/yopendata1070622opendatajson-1070622.json';
    const response = await axios.get(endpoint);
    return response.data;
  } catch(error) {
    console.log("Output: getStations -> err", error);
  }
}

async function userLogin() {
  try {
    const endpoint = 'http://localhost:3000/login';
    const response = await axios.post(endpoint, {
      account: 'account',
      password: 'password'
    })
    return response.data

  } catch (error) {
    console.log("Output: register -> error", error);
  }
}


export {
  getStations,
  userLogin
}
