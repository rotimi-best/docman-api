const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp')

const GroupSchema = new Schema({
  name: String,
  documents: Array,
  userId: Schema.Types.ObjectId
});

GroupSchema.plugin(timestamp)

module.exports = mongoose.model('Group', GroupSchema)
