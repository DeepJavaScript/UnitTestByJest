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