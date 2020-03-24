export function promiseGenerator(isResolved) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolved
        ? resolve('resolved')
        : reject('rejected');
    }, 500);
  });
};
