const { getChangedFilesForRoots, findRepos } = require('jest-changed-files');

getChangedFilesForRoots(['./'], {
  // lastCommit: true,
  // withAncestor: true
  // changedSince: '80dba53',
  // includePaths: ['./week-04/src']
}).then(result => console.log(result));

findRepos(['./']).then(repos => console.log(repos));