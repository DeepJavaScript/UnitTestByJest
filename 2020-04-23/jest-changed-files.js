const {getChangedFilesForRoots, findRepos} = require('jest-changed-files');

// print the set of modified files since last commit in the current repo
getChangedFilesForRoots(['./'], {
  lastCommit: true,
  withAncestor: false
}).then(result => console.log("getChangedFilesForRoots: ", result));

findRepos(['./']).then(result => console.log("findRepos: ", result));
