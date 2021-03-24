/* eslint-disable */
const response = require('./utils/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_KEY = 'secret_key'

class auth {
  constructor() {
    this.USER = require('../database/models/user')
    this.ROLE = require('../database/models/role')
  }
  login(name, password) {
    const app = this
    return this.USER.findOne({ name: name }).then(doc => {
      if (doc !== null) {
        return bcrypt.compare(password, doc.password).then(async function(result) {
          if (!result) {
            return response.error('la contraseña es incorrecta.')
          }
          const user = await app.getUser(doc._id)
          return response.success({
            token: app.genToken(user)
          })
        })
      } else {
        return response.error('El nombre de usuario no es correcto.')
      }
    }).catch(err => {
      console.log(err)
      return response.error('los credenciales son incorrectos')
    })
  }
  info(token) {
    var user = this.decodeToken(token)
    user.introduction = 'example'
    return response.success(JSON.parse(JSON.stringify(user)));
  }
  getUser(id) {
    const app = this
    return this.USER.findById(id).then(async doc => {
      if (doc !== null) {
        const roles = (await app.ROLE.find({ 'name': { '$in' : doc.roles }}, (err, list) => {
          if (err) {
            console.log(err)
            return []
          }
          return list
        }))
        const resp = {
          id: doc._id,
          name: doc.name,
          roles: roles.map(role => {
            return role.name
          }),
          permissions: roles.reduce((arr, role) => {
            role.permissions.forEach(element => {
              if (!arr.includes(element)) {
                arr.push(element)
              }
            })
            return arr
          }, [])
        }
        return resp
      }
      return null
    }).catch(err => {
      console.log(err)
      return response.error('El id es incorrecto')
    })
  }
  genToken(user) {
    return jwt.sign(user, JWT_KEY)
  }
  decodeToken(token) {
    return jwt.verify(token, JWT_KEY)
  }
  listen() {
    const { ipcMain } = require('electron')
    const app = this
    // login listener
    ipcMain.handle(`auth-login`, async(e, args) => {
      const data = await app.login(args.data.username, args.data.password)
      return data
    })
    ipcMain.handle(`auth-info`, async(e, args) => {
      return await this.info(args.token)
    })
  }
}
module.exports = auth
