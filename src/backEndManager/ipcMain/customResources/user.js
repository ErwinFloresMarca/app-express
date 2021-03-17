const R = require('../resource')
const bcrypt = require('bcrypt')
const response = require('../utils/response')
class user extends R {
  constructor() {
    super('user')
    this.checkHasAdmin()
  }
  store(data) {
    const app = this
    if (data.userByApi) {
      data.roles = []
      data.roles.push(process.env.ROLE_BY_USER_API)
    }
    return bcrypt.hash(data.password, 10).then(async function(hash) {
      data.password = hash
      const newRegister = new app.Model(data)
      return response.success(JSON.parse(JSON.stringify((await newRegister.save()))))
    }).catch(err => {
      console.log(err)
    })
  }
  update(id, data) {
    data.password = bcrypt.hashSync(data.password, 10)
    return this.Model.findByIdAndUpdate(id, data).then(docs => {
      return response.success(docs)
    }).catch(err => {
      console.log(err)
      return response.error('no se encontro el registro')
    })
  }
  checkHasAdmin() {
    const app = this
    this.Model.findOne({ name: 'admin' }).then(doc => {
      if (!doc) {
        app.store({
          name: 'admin',
          password: '123456',
          roles: ['admin']
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
module.exports = user
