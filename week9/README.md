# Timer Mocks
與時間有關的 function，例如：setTimeout, setInterval, clearTimeout, clearInterval，並不適合發生於測試環境中。

因此可透過 JEST 提供的 time mocks 把他 mock 掉。

### jest.useFakeTimers(implementation?: 'modern' | 'legacy')

用以替代標準的時間相關方法(setTimeout, setInterval, clearTimeout, clearInterval, nextTick, setImmediate and clearImmediate)。

- 若傳入參數 modern，代表使用 [@sinonjs/fake-timers](https://github.com/sinonjs/fake-timers) (可以 mock date)，取代 jest 的 Mock function
- Returns the jest object for chaining.

範例：

```javascript
// timerGame.js
'use strict';

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

```javascript
// __tests__/timerGame-test.js
'use strict';

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  const timerGame = require('../timerGame');
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
```

使用之前一定要 call jest.useFakeTimers()，可以統一管理於 set 裡面，例如 beforeEach

## Run All Timers : runAllTimers

加速計時器，取得結果

```javascript
jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  const timerGame = require('../js/timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  // At this point in time, the callback should not have been called yet
  expect(callback).toBeCalled();
});
```

## Run Pending Timers

有可能有情境是計時器裡面再用計時器 call 下一次執行。這時可以使用 jest.runOnlyPendingTimers()，得到run 完當前計時器的結果

```javascript
// infiniteTimerGame.js
'use strict';

function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    // Schedule the next game in 10 seconds
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}

module.exports = infiniteTimerGame;
```

```javascript
// __tests__/infiniteTimerGame-test.js
'use strict';

jest.useFakeTimers();

describe('infiniteTimerGame', () => {
  test('schedules a 10-second timer after 1 second', () => {
    const infiniteTimerGame = require('../infiniteTimerGame');
    const callback = jest.fn();

    infiniteTimerGame(callback);

    // At this point in time, there should have been a single call to
    // setTimeout to schedule the end of the game in 1 second.
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    // Fast forward and exhaust only currently pending timers
    // (but not any new timers that get created during that process)
    // 推進到完成第一次的一秒鐘計時器
    jest.runOnlyPendingTimers();

    // At this point, our 1-second timer should have fired it's callback
    expect(callback).toBeCalled();

    // And it should have created a new timer to start the game over in
    // 10 seconds
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});
```

## Advance Timers by Time

也可以一個一個步驟控制時間

```javascript
// infiniteTimerGame.js
'use strict';

function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    // Schedule the next game in 10 seconds
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}

module.exports = infiniteTimerGame;
```

```javascript
test('test advanceTimersByTime', () => {
  const infiniteTimerGame = require('../js/infiniteTimerGame');
  const callback = jest.fn();

  infiniteTimerGame(callback);

  jest.advanceTimersByTime(12000);

  expect(setTimeout).toHaveBeenCalledTimes(4);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
});
```

- 用剛剛的迴圈計時器來測，發現這邊的計時器不會有延遲問題？  不確定是剛好沒發生，還是真的不會有～ ？？？？？？