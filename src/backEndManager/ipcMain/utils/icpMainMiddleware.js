const { ipcMain } = require('electron')
const auth = new (require('../auth'))()

function syncListener(chanel, callback) {
  // login listener
  ipcMain.handle(chanel, async(e, args) => {
    if (args.token) {
      args.user = auth.decodeToken(args.token)
    }
    return await callback(args)
  })
}
module.exports = syncListener
