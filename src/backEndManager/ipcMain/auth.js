const response = require('./utils/response')
const bcrypt = require('bcrypt')
class auth {
  constructor() {
    this.USER = require('../database/models/user')
    const R = require('./resource')
    this.roleResource = new R('role')
    this.permissionResource = new R('permission')
  }
  login(username, password) {
    this.USER.findOne({ username: username }).then(doc => {
      if (doc !== null) {
        return bcrypt.compare(password, doc.password).then(async function(result) {
          if (!result) {
            return response.error('la contraseña es incorrecta.')
          }
          const role = await this.roleResource.findById(doc.role, (err, r) => {
            if (err) {
              console.log(err)
              return false
            }
            return r
          })
          const resp = {
            username: doc.username,
            role: role,
            permissions: role.permissions
          }
          return response.success(resp)
        })
      } else {
        return response.error('El nombre de usuario no es correcto.')
      }
    }).catch(err => {
      console.log(err)
      return response.error('los credenciales son incorrectos')
    })
  }
  listen() {
    const { ipcMain } = require('electron')
    const app = this
    // login listener
    ipcMain.handle(`login`, async(e, args) => {
      return app.login(args.username, args.password)
    })
  }
}
module.exports = auth
