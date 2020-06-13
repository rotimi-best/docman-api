const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp')

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatarUrl: String,
});

UserSchema.plugin(timestamp)

module.exports = mongoose.model('User', UserSchema)
