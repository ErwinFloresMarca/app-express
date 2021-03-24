const { ipcRenderer } = window.require('electron')

function listen(channel, callback) {
  return ipcRenderer.on(channel, callback)
}

export default listen
