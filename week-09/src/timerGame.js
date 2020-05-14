export function timerGame(comment, callback) {
  console.log(`${comment}: Ready....go!`);
  setTimeout(() => {
    console.log(`${comment}: Time's up -- stop!`);
    callback && callback();
  }, 1000);
}