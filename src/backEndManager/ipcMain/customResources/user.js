const R = require('../resource')
const bcrypt = require('bcrypt')
class user extends R {
  constructor() {
    super('user')
  }
  store(data) {
    const app = this
    return bcrypt.hash(data.password, 10).then(function(hash) {
      data.password = hash
      const newRegister = new app.Model(data)
      return newRegister.save()
    }).catch(err => {
      console.log(err)
    })
  }
}
module.exports = user
