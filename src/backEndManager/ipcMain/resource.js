const response = require('./utils/response')
class resource {
  constructor(modelName, permisions = []) {
    this.modelName = modelName
    this.permisions = ['list', 'get', 'store', 'update', 'destroy']
    this.permisions.concat(permisions)
    this.Model = require(`./../database/models/${modelName}`)
    this.checkPermissions()
  }
  list(query = {}, paginate = { paginate: false }) {
    return this.Model.paginate(query, paginate).then(docs => {
      return response.success(docs)
    }).catch(err => {
      console.log(err)
      return response.error('algo salio mal')
    })
  }
  get(id = null) {
    return this.Model.findById(id).then(docs => {
      return response.success(docs)
    }).catch(err => {
      console.log(err)
      return response.error('no se encontro el registro')
    })
  }
  store(data) {
    const newRegister = new this.Model(data)
    return newRegister.save()
  }
  update(id, data) {
    return this.Model.findByIdAndUpdate(id, data).then(docs => {
      return response.success(docs)
    }).catch(err => {
      console.log(err)
      return response.error('no se encontro el registro')
    })
  }
  destroy(id) {
    return this.Model.findByIdAndDelete(id).then(docs => {
      return response.success(docs)
    }).catch(err => {
      console.log(err)
      return response.error('no se encontro el registro')
    })
  }
  addingListeners(ipcMain) {
  }
  validPermision(args, permision) {
    if (this.permisions.includes(permision)) {
      if (args.user.permisions.includes(`${this.modelName}_${permision}`)) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
  listen() {
    const { ipcMain } = require('electron')
    const app = this
    // list listener
    ipcMain.handle(`${this.modelName}-list`, async(e, args) => {
      if (!app.validPermision(args, 'list')) {
        return response.error('No tiene los permisos validos')
      }
      return this.list(args.data.query, args.data.paginate)
    })
    // get listener
    ipcMain.handle(`${this.modelName}-get`, async(e, args) => {
      if (!app.validPermision(args, 'get')) {
        return response.error('No tiene los permisos validos')
      }
      return this.get(args.data.id)
    })
    // store Listener
    ipcMain.handle(`${this.modelName}-store`, async(e, args) => {
      if (!app.validPermision(args, 'store')) {
        return response.error('No tiene los permisos validos')
      }
      return response.success(this.store(args.data))
    })
    // update Listener
    ipcMain.handle(`${this.modelName}-update`, async(e, args) => {
      if (!app.validPermision(args, 'update')) {
        return response.error('No tiene los permisos validos')
      }
      return this.update(args.data.id, args.data.data)
    })
    // delete Listener
    ipcMain.handle(`${this.modelName}-destroy`, async(e, args) => {
      if (!app.validPermision(args, 'destroy')) {
        return response.error('No tiene los permisos validos')
      }
      return this.destroy(args.data.id)
    })
    // add custom listeners
    this.addingListeners(ipcMain)
  }
  checkPermissions() {
    const PERMISSION = require('../database/models/permission')
    const app = this
    PERMISSION.find({
      'name': { $regex: '.*' + this.modelName + '.*' }
    }).then(docs => {
      if (docs.length === 0) {
        app.genratePermissions(PERMISSION)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  genratePermissions(PERMISSION) {
    const app = this
    this.permisions.forEach(element => {
      const newPermission = new PERMISSION({
        name: `${app.modelName}_${element}`,
        description: `permiso para acceder a ${element} de ${app.modelName}`,
        label: `${app.modelName} ${element}`
      })
      newPermission.save()
    })
  }
}
module.exports = resource
