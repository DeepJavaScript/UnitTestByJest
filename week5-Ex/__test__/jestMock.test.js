import * as testFn  from '../js/jestMock';
import axios from 'axios';

// jest.mock 可以用來模擬整個模組使用
jest.mock('axios');

describe('Test jestMock file', () => {
  test('Fn: getStations', async () => {
    // Arrange
    const chargeStations = [
      {
        Kind: "公共充電站",
        Charge: "免費",
        Location: "新興區公所 ",
        Address: " 高雄市新興區中正三路34號1樓(室內停車場)"
      }
    ];
    // api 回傳格式
    const response = { data: chargeStations };

    // Act
      // mockResolvedValue 可以用來模擬非同步回傳的值
      //這裡用來模擬 api 回傳的值(使用 get 方法) 
    axios.get.mockResolvedValue(response);
    
    // Assert
      // 官方使用 return 是為了避免測試比 promise 更早執行完畢。
    await testFn.getStations()
      .then(data => expect(data).toEqual(chargeStations));
  });

  test('Fn: userLogin' , async () => {
    // Arrange
    const userInfo = {
      account: 'account',
      password: 'password'
    };
    // Act
      //這裡用來模擬發出登入請求(使用 post 方法) 
    const mockPost = axios.post.mockResolvedValue();
    await testFn.userLogin()

    // Assert
    const url = mockPost.mock.calls[0][0];
    expect(url).toBe('http://localhost:3000/login');

    const json = mockPost.mock.calls[0][1];
    expect(json).toEqual(userInfo);
  })
})