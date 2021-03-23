var PouchDB = require('pouchdb')

module.exports = async function archiveConflicts(dbPath, docId) {
  try {
    const dbSource = new PouchDB(dbPath)
    const dbConflictRevs = new PouchDB(`${dbPath}-conflict-revs`)
    const doc = await dbSource.get(docId, {conflicts: true})
    for (conflictRev of doc._conflicts) {
      const conflictRevDoc = await dbSource.get(docId, {rev: conflictRev})
      conflictRevDoc.originalDocId = conflictRevDoc._id
      delete conflictRevDoc._id
      delete conflictRevDoc._rev
      await dbConflictRevs.post(conflictRevDoc)
      await dbSource.remove(docId, conflictRev)
    }
    return doc._conflicts
  } catch (e) {
    console.log(e)
  }
}
