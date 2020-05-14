import { timerGame } from '../src/timerGame';

describe('Advance Timers by Time', () => {
  it('1 秒後透過 `advanceTimersByTime` 呼叫 callback', () => {
    jest.useFakeTimers();

    const callback = jest.fn();
    timerGame(1, callback);
  
    // 此時 callback 應該還沒被呼叫
    expect(callback).not.toBeCalled();
  
    // 快轉直到執行完所有 timer
    jest.advanceTimersByTime(1000);
  
    // 現在 callback 已被呼叫
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});