const GroupModel = require('../models/group');

module.exports = {
  addGroup: data => require('./templates/add')(GroupModel, data),
  getGroup: (params, sort, selectedFields) =>
    require('./templates/get')(GroupModel, params, sort, selectedFields),
  updateGroup: (findField, setField) =>
    require('./templates/update')(GroupModel, findField, setField),
  deleteGroup: findField =>
    require('./templates/delete')(GroupModel, findField),
}
