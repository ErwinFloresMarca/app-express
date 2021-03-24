import listen from '@/utils/listen'
import request from '@/utils/request'

class Resource {
  constructor() {
    this.resorceName = 'barcode'
  }
  onRead(callback) {
    listen('barcode-on-read', callback)
  }
  getDevices() {
    return request(`${this.resorceName}-devices`, {})
  }
  use(device) {
    return request(`${this.resorceName}-use`, { data: device })
  }
  startScan() {
    return request(`${this.resorceName}-scan`, {})
  }
  stopScan() {
    return request(`${this.resorceName}-stop`, {})
  }
}

export default (new Resource())
