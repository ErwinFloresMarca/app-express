const R = require('./resource')
const UserResource = new (require('./customResources/user'))()
const RoleResource = new R('role')
const ProductResource = new R('product')
const PermissionResource = new R('permission')
const Auth = new (require('./auth'))()
module.exports = {
  listen() {
    Auth.listen()
    UserResource.listen()
    RoleResource.listen()
    PermissionResource.listen()
    ProductResource.listen()
  }
}
