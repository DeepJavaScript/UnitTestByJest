import { timerGame } from '../src/timerGame';

describe('執行一次 timer', () => {
  // jest.useFakeTimers();
  it('等待 1 秒後結束遊戲', () => {
    jest.useFakeTimers();

    timerGame(1);

    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).lastCalledWith(expect.any(Function), 1000);
    // jest.clearAllTimers();
  });
});

describe('執行所有 timer', () => {
  // jest.useFakeTimers();
  it('1 秒後呼叫 callback', () => {
    jest.useFakeTimers();

    const callback = jest.fn();

    timerGame(2, callback);

    // 此時 callback 應該還沒被呼叫
    expect(callback).not.toBeCalled();

    // 快轉直到執行完所有 timer
    jest.runAllTimers();

    // 現在 callback 已被呼叫
    expect(callback).toBeCalled();
    expect(callback).toBeCalledTimes(1);

    console.log(setTimeout.mock.calls);

    expect(setTimeout).toBeCalledTimes(1);
  });
});
