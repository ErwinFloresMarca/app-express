const { ipcMain } = require('electron')
const auth = new (require('../auth'))()

function syncListener(chanel, callback) {
  // login listener
  ipcMain.handle(chanel, async(e, args) => {
    args.user = auth.docodeToken(args.token)
    return await callback(args)
  })
}
module.exports = syncListener
