Week 09：Timer Mocks
===

native timer 函數 (即 `setTimeout`、`setInterval`、`clearTimeout`、`clearInterval` ) 不好測試，因為會依賴於真實流逝的時間。

Jest 提供控制時間流逝的函數來替換 timer。

呼叫 `jest.useFakeTimers()` 來啟動 fake timer，也就是使用 mock 函數 mock 掉 `setTimeout` 和其他 timer 函數。

:::info
`jest.useFakeTimers(implementation?: 'modern' | 'legacy')`：
- 指定 Jest 使用 fake 的標準 timer 函數，包括：
  - `setTimeout`
  - `setInterval`
  - `clearTimeout`
  - `clearInterval`
  - `nextTick`
  - `setImmediate`
  - `clearImmediate`
- 若使用 `'modern'` 作為 argument，則會使用 [@sinonjs/fake-timers](https://github.com/sinonjs/fake-timers) 來作為 implementation，而不是 Jest 自己的 fake timer
- 也可 mock 其他 timer，例如：`Date`
- `'modern'` 是 Jest 27 的預設行為 (目前我使用的環境是 Jest 25，所以是用 `legacy` )
- 回傳用於 chaining 的 `jest` 物件
:::

:::info
在 `jest.config.js` 內的 `timers` config：
- 預設為 `"real"`
- 設為 `"legacy"` 或 `"fake"` 時，允許對函數使用 fake timer。當程式碼設定了不想在測試中等待的 long timeout，fake timer 就很好用
- 設為 `"modern"` 時，會將 [`@sinonjs/fake-timers`](https://github.com/sinonjs/fake-timers) 作為實作，而不是 Jest 自己的舊實作。Jest 27 會預設此設定

在 Jest 15 開始才將 `timers` config 預設成 `"real"`。可透過在配置中指定 `timers: "fake"` 或呼叫 `jest.useRealTimers()` 和 `jest.useFakeTimers()` 全域開關來覆蓋此設定。

資料來源：[Jest 15.0: New Defaults for Jest · Jest](https://jestjs.io/blog/2016/09/01/jest-15.html)
:::

```javascript
// src/timerGame.js
export function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}
```

```javascript
// __tests__/timerGame.test.js
import { timerGame } from '../src/timerGame';

jest.useFakeTimers();

describe('執行一次 timer', () => {
  it('等待 1 秒後結束遊戲', () => {
    timerGame();
  
    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).lastCalledWith(expect.any(Function), 1000);
  });
});
```

但上面的測試只有測到 `timerGame()`：
- `setTimeout` 被呼叫幾次
- 最後一次呼叫 `setTimeout` 的 argument 為何：
  - 第一個 argument 可以是任何函數
  - 第二個 argument 一定是 `1000` 豪秒

所以 `timerGame()` 內的 `console.log("Time's up -- stop!")` 那行都還沒執行就測試通過了 (所以才只輸出 `'Ready....go!'` 這行)。

若在一個檔案或 `describe` 區塊中執行多個測試，就可在每個測試之前手動呼叫 `jest.useFakeTimers()`，或是使用 `beforeEach` 之類的 [setup 函數](https://github.com/DeepJavaScript/UnitTestByJest/tree/titan/week-04)。否則會讓內部使用的 timer 未被 reset。

:::info
不建議在以下位置使用 `jest.useFakeTimers()`：
- 測試檔案的全域呼叫
- 直接在 `describe` 區塊內呼叫

建議在 setup 和 teardown 時 reset timer。

當然放在 `it` 或 `test` 區塊內，或在 setup 和 teardown 呼叫也可以，但需重複寫很多次，很麻煩。
:::

```javascript
// __tests__/resetTimer.test.js
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
      timerGame();
    
      expect(setTimeout).toBeCalledTimes(1);
      expect(setTimeout).lastCalledWith(expect.any(Function), 1000);
    });
  
    it('setTimeout 的呼叫次數應為 2 次，setTimeout 的呼叫次數會因前面的測試未 reset timer 而影響', () => {
      timerGame();
  
      expect(setTimeout).not.toBeCalledTimes(1);
      expect(setTimeout).toBeCalledTimes(2);
    });
  });

  describe('有在每個測試執行前 reset timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
  
    it('setTimeout 的呼叫次數應為 1 次', () => {
      timerGame();
    
      expect(setTimeout).toBeCalledTimes(1);
      expect(setTimeout).lastCalledWith(expect.any(Function), 1000);
    });
  
    it('setTimeout 的呼叫次數應為 1 次，setTimeout 的呼叫次數不會受前面的測試影響', () => {
      timerGame();
  
      expect(setTimeout).toBeCalledTimes(1);
    });
  });
});
```

:::info
Expect：
- `.toHaveBeenCalledTimes(number)`：確保 mock 函數被呼叫的確切次數
  - alias：`.toBeCalledTimes(number)`
- `.toHaveBeenLastCalledWith(arg1, arg2, ...)`：測試 mock 函數最後一次呼叫的 argument
  - alias：`.lastCalledWith(arg1, arg2, ...)`
:::

## 執行所有 timer

若要測試 assert 在 1 秒後呼叫 callback，可在測試中使用 Jest 的 timer 控制 API `jest.runAllTimers()` 來快轉時間：

```javascript
// __tests__/timerGame.test.js
describe('執行所有 timer', () => {
  it('1 秒後呼叫 callback', () => {
    jest.useFakeTimers();

    const callback = jest.fn();
  
    timerGame(callback);
  
    // 此時 callback 應該還沒被呼叫
    expect(callback).not.toBeCalled();
  
    // 快轉直到執行完所有 timer
    jest.runAllTimers();
  
    // 現在 callback 已被呼叫
    expect(callback).toBeCalled();
    expect(callback).toBeCalledTimes(1);
  });
});
```

:::info
`jest.runAllTimers()`：
- 用盡 macro-task queue (即由 `setTimeout()`、`setInterval()` 和 `setImmediate()` 排隊 (queued) 的所有 task) 和 micro-task queue (通常會透過 `process.nextTick` interfaced 至 node)
- 呼叫此 API 時，會執行所有 pending macro-tasks 和 micro-tasks。若這些 task 本身安排了 (schedule) 新 task，這些 task 就會不斷的耗盡 (exhausted)，直到 queue 中沒有其他 task 為止
- 通常在測試期間同步執行 `setTimeout` 很有用，以便同步 assert 某些行為，但這些行為只會在 `setTimeout()` 或 `setInterval()` 的 callback 執行後才發生
:::

## 執行 pending timer

假設有遞迴的 timer，會在自己的 callback 中設定一個新的 timer。若執行所有 timer 就會變成無限迴圈，所以不能用像是 `jest.runAllTimers()`，但可用 `jest.runOnlyPendingTimers()`：

```javascript
// src/infiniteTimerGame.js
export function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up! 5 seconds before the next game starts...");
    callback && callback();

    // 在 5 秒內安排下一場比賽
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 5000);
  }, 1000);
}
```

```javascript
// __tests__/infiniteTimerGame.test.js
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
```

## 依時間 advance (提前) timer

`jest.advanceTimersByTime(msToRun)`：
- Jest 22.0.0 將 `runTimersToTime()` (但還可以當作 alias 使用) 重新命名成 `advanceTimersByTime()`
- 只會執行 macro task queue (即由 `setTimeout()` 或 `setInterval()` 和 `setImmediate()` 排隊 (queued) 的所有 task)
- 呼叫時，所有 timer 都會被提前 `msToRun` 豪秒
- 透過 `setTimeout()` 或 `setInterval()` 排隊 (queued)，並在此時間範圍 (time frame) 內執行的所有 pending "macro-tasks" 都會被執行
- 如果這些是 macro-tasks 計劃 (schedule) 在同一時間範圍內執行的新 macro-tasks，就會一直執行這些 macro-tasks，直到 queue 中沒有其他應該在 `msToRun` 毫秒內執行的 macro-tasks 為止

```javascript
// __tests__/advanceTimersByTime.test.js
describe('Advance Timers by Time', () => {
  it('1 秒後透過 `advanceTimersByTime` 呼叫 callback', () => {
    const callback = jest.fn();
    timerGame(callback);
  
    // 此時 callback 應該還沒被呼叫
    expect(callback).not.toBeCalled();
  
    // 快轉直到執行完所有 timer
    jest.advanceTimersByTime(1000);
  
    // 現在 callback 已被呼叫
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

可用 `jest.clearAllTimers()` 從 timer 系統中刪除所有 pending timer，也就是若 scheduled (安排了) 任何 timer (但尚未執行)，可被清除並永遠沒有機會執行它們。

---

- `jest.useRealTimers()`
  - 指定 Jest 使用標準 timer 函數的實際版本
  - 回傳用於 chaining 的 `jest` 物件
- `jest.runAllTicks()`：
  - 耗盡 micro-task queue (通常會透過 `process.nextTick` interfaced 至 node)
  - 呼叫此 API 時，會執行透過 `process.nextTick` 排隊 (queued) 的所有 pending micro-tasks
  - 若這些 micro-tasks 安排了 (schedule) 新 task，這些 task 就會不斷的耗盡 (exhausted)，直到 queue 中沒有其他 micro-tasks 為止
- `jest.runAllImmediates()`：
  - 耗盡由 `setImmediate()` 排隊 (queued) 的所有 tasks
  - 注意：使用 modern fake timers implementation 時，此函數不可用
- `jest.runOnlyPendingTimers()`：
  - 只執行當前 pending macro-tasks (即只執行 `setTimeout()` 或 `setInterval()` 至目前為止已 queued (排隊) 的 task)
  - 若任何當前 pending macro-tasks 安排了 (schedule) 新 task，這些新 task 就不會透過 `jest.runOnlyPendingTimers()` 呼叫執行
- `jest.advanceTimersToNextTimer(steps?)`：
  - 將所有 timer 提前所需的毫秒數，以便只執行下一個 timeouts/intervals
  - 可提供 `steps` arg，執行下一次 timeouts/intervals 的 `steps` 數
- `jest.getTimerCount()`：
  - 回傳仍在執行的 fake timer 數量
- `jest.setSystemTime()`：
  - 設定 fake timer 使用的當前系統時間
  - 模擬使用者在 program 執行時變更系統時鐘
  - 會影響當前時間，但不會導致像是 timers to fire (定時觸發)
  - 會完全照原樣觸發 (fire)，而無需呼叫 `jest.setSystemTime()`
  - 注意：此函數只在使用 modern fake timers implementation 時可用
- `jest.getRealSystemTime()`：
  - 在 mock 時間時，也會 mock `Date.now()`
  - 若想存取實際的當前時間，可 invoke 此函數
  - 注意：此函數只在使用 modern fake timers implementation 時可用
- `jest.setTimeout(timeout)`：
  - 設定測試和 hook 之前/之後的預設 timeout interval (單位為豪秒)
  - 會影響從中呼叫此函數的測試檔案
  - 若未呼叫此方法，預設 timeout interval 為 5 秒
  - 注意：若要為所有測試檔案設定 timeout，可在 `setupFilesAfterEnv` 中設定
- `jest.retryTimes(numTestRetries)`：
  - n 次執行失敗的測試，直到它們通過或直到最大重試次數用完為止
  - 只適用於 [`jest-circus`](https://github.com/facebook/jest/tree/master/packages/jest-circus)
  - 回傳用於 chaining 的 `jest` 物件

```javascript
jest.retryTimes(3);
test('will fail', () => {
  expect(true).toBe(false);
});
```
