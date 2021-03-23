#!/usr/bin/env node
const archiveConflicts = require('./archive-conflicts.js')

archiveConflicts(process.argv[2], process.argv[3])
  .then(conflictRevs => console.log(conflictRevs))

