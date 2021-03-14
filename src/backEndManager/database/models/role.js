const { Schema, model } = require('../connect')
const mongoosePaginate = require('mongoose-paginate-v2')
const roleSchema = new Schema({
  name: {
    type: String,
    unique: true,
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
  },
  permissions: {
    type: Array,
    default: []
  }
})

roleSchema.plugin(mongoosePaginate)

const Role = model('role', roleSchema)

Role.findOne({ name: 'admin' }, (err, doc) => {
  if (err) {
    console.log(err)
  }
  if (doc === null) {
    const adminRole = new Role({
      name: 'admin',
      label: 'Administrador',
      description: 'Role de adinistrador con acceso a todo',
      permissions: []
    })
    adminRole.save()
  }
})

module.exports = Role
