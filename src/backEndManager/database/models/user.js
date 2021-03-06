const mongoose = require('../connect')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    default: null,
    require: true
  },
  password: {
    type: String,
    default: null,
    require: true
  },
  roles: {
    type: Array,
    default: null,
    require: true
  }
})

userSchema.plugin(mongoosePaginate)

const user = mongoose.model('user', userSchema)

module.exports = user
