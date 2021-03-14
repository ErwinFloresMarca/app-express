const R = require('../resource')
const bcrypt = require('bcrypt')
class user extends R {
  constructor() {
    super('user')
  }
  store(data) {
    return bcrypt.hash(data.password, 10).then(function(hash) {
      data.password = hash
      const newRegister = new this.Model(data)
      return newRegister.save()
    })
  }
}
module.exports = user
