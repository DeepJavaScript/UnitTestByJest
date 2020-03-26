export const getData = (callBack) => {
  setTimeout(() => { callBack('data'); }, 1000);
};

export const getDataWithPromoseResolve = () => (
  new Promise((resolve,reject) => {
    setTimeout(() => { resolve('data'); }, 1000);
  })
);

export const getDataWithPromoseReject = () => (
  new Promise((resolve,reject) => {
    setTimeout(() => { reject('error'); }, 1000);
  })
);