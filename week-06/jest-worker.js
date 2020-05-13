const JestWorker = require('jest-worker').default;

async function main() {
  const worker = new JestWorker(require.resolve('./heavy-task.js'));

  const results = await Promise.all([
    worker.myHeavyTask(0),
    worker.myHeavyTask(1),
  ]);

  console.log(results);

  const { forceExited } = await worker.end();
  if (forceExited) {
    console.error('Workers failed to exit gracefully');
  }
}

main();