import { infiniteTimerGame } from '../src/infiniteTimerGame';


describe('infiniteTimerGame', () => {
  test('在 1 秒後安排 5 秒 timer', () => {
    jest.useFakeTimers();

    const callback = jest.fn();

    infiniteTimerGame(callback);

    // 此時應該只有呼叫一次 `setTimeout` 才能在 1 秒內安排遊戲結束
    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).lastCalledWith(expect.any(Function), 1000);

    // 快轉並只耗盡當前 pending timer
    // (但此過程中不會建立任何新的 timer)
    jest.runOnlyPendingTimers();

    // 此時，1 秒的 timer 應該觸發了 callback
    expect(callback).toBeCalled();

    // 並且應該已建立一個新的 timer，可在 5 秒內開始遊戲
    expect(setTimeout).toBeCalledTimes(2);
    expect(setTimeout).lastCalledWith(expect.any(Function), 5000);
  });
});