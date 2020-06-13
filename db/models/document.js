const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp')

const DocumentSchema = new Schema({
  name: String,
  type: String,
  url: String,
  cost: String,
  userId: Schema.Types.ObjectId
});

DocumentSchema.plugin(timestamp)

module.exports = mongoose.model('Document', DocumentSchema)
