import { timerGame } from '../src/timerGame';

// 不建議在測試檔案的全域使用 `jest.useFakeTimers()`
// 應在 Setup and Teardown 時 reset timer
// jest.useFakeTimers();

describe('每個測試都只呼叫一次 `timerGame()`', () => {
  describe('未在每個測試執行前 reset timer', () => {
    // 不建議直接在 `describe` 區塊內呼叫 `jest.useFakeTimers()`
    // 應在 Setup and Teardown 時 reset timer
    jest.useFakeTimers();
  
    it('setTimeout 的呼叫次數應為 1 次', () => {
      timerGame(1);
    
      expect(setTimeout).toBeCalledTimes(1);
      expect(setTimeout).lastCalledWith(expect.any(Function), 1000);
    });
  
    it('setTimeout 的呼叫次數應為 2 次，setTimeout 的呼叫次數會因前面的測試未 reset timer 而影響', () => {
      timerGame(2);
  
      expect(setTimeout).not.toBeCalledTimes(1);
      expect(setTimeout).toBeCalledTimes(2);
    });
  });

  describe('有在每個測試執行前 reset timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
  
    it('setTimeout 的呼叫次數應為 1 次', () => {
      timerGame(3);
    
      expect(setTimeout).toBeCalledTimes(1);
      expect(setTimeout).lastCalledWith(expect.any(Function), 1000);
    });
  
    it('setTimeout 的呼叫次數應為 1 次，setTimeout 的呼叫次數不會受前面的測試影響', () => {
      timerGame(4);
  
      expect(setTimeout).toBeCalledTimes(1);
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
  });
});