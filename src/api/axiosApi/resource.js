import request from '@/utils/axiosRequest'

class resource {
  constructor(uri) {
    this.url = uri
  }
  list(query = null) {
    var config = {
      url: `${this.url}/`,
      method: 'get'
    }
    if (query) {
      config.query = query
    }
    return request(config)
  }
  get(id, query) {
    return request({
      url: `${this.url}/${id}`,
      method: 'get',
      query: query
    })
  }
  store(data) {
    return request({
      url: `${this.url}/`,
      method: 'post',
      data: data
    })
  }
  update(id, data) {
    return request({
      url: `${this.url}/${id}`,
      method: 'put',
      data: data
    })
  }
  delete(id) {
    return request({
      url: `${this.url}/${id}`,
      method: 'delete'
    })
  }
}

export default resource
