const { Schema, model } = require('../connect')
const mongoosePaginate = require('mongoose-paginate-v2')
const permissionSchema = new Schema({
  name: {
    type: String,
    default: null,
    require: true
  },
  description: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null,
    require: true
  }
})

permissionSchema.plugin(mongoosePaginate)

const permission = model('permission', permissionSchema)
module.exports = permission
