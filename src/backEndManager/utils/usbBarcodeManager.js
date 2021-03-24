const { getDevices, UsbScanner } = require('usb-barcode-scanner')
var scanner = null
function selectDevice({ vendorId, productId }) {
  scanner = new UsbScanner({ vendorId, productId })
  return true
}

function startScanner(callBack) {
  scanner.on('data', (data) => {
    callBack(data)
  })
  scanner.startScanning()
}

function stopScanner() {
  scanner.stopScanning()
}

module.exports = {
  getDevices,
  selectDevice,
  startScanner,
  stopScanner
}
