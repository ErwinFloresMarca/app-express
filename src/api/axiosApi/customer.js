import resource from './resource'
import request from '@/utils/axiosRequest'

class Customer extends resource {
  constructor() {
    super('customer')
  }
  tokenStore(data) {
    return request({
      url: `${this.url}/tokenstore/get`,
      method: 'post',
      data: data
    })
  }
}

export default (new Customer())
