const DocumentModel = require('../models/document');

module.exports = {
  addDocument: data => require('./templates/add')(DocumentModel, data),
  getDocument: (params, sort, selectedFields) =>
    require('./templates/get')(DocumentModel, params, sort, selectedFields),
  updateDocument: (findField, setField) =>
    require('./templates/update')(DocumentModel, findField, setField),
  deleteDocument: findField =>
    require('./templates/delete')(DocumentModel, findField),
}
