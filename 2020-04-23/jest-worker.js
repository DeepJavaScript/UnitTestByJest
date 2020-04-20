const JestWorker = require('jest-worker').default;

async function main() {
  const worker = new JestWorker(require.resolve('./heavy-task.js'));

  // run 2 tasks in parallel with different arguments
  const results = await Promise.all([
    worker.myHeavyTask(0),
    worker.myHeavyTask(1),
  ]);

  console.log(results);
}

main();