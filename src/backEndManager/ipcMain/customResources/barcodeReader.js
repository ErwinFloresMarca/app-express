const br = require('@/backEndManager/utils/usbBarcodeManager')
const response = require('../utils/response')
const { icpMain } = require('electron')
function onRead(data) {
  icpMain.send('barcode-on-read', data)
}
class BarcodeReader {
  constructor() {
    this.modelName = 'barcode'
  }
  listen() {
    const syncListener = require('../utils/icpMainMiddleware')
    // list listener
    syncListener(`${this.modelName}-devices`, async(args) => {
      console.log(br.getDevices())
      return response.success(br.getDevices())
    })
    syncListener(`${this.modelName}-use`, async(args) => {
      return response.success(br.selectDevice(args.data.data))
    })
    syncListener(`${this.modelName}-scan`, async(args) => {
      br.startScanner(onRead)
      return response.success({ message: 'escaneo iniciado' })
    })
    syncListener(`${this.modelName}-stop`, async(args) => {
      br.stopScanner()
      return response.success({ message: 'escaneo detenido' })
    })
  }
}

module.exports = new BarcodeReader()
