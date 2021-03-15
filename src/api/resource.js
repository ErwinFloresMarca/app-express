import request from '@/utils/request'

class resource {
  constructor(resorceName) {
    this.resorceName = resorceName
  }
  list(query = {}, paginate = {}) {
    return request(`${this.resorceName}-list`, { query: query, paginate: paginate })
  }
  get(id) {
    return request(`${this.resorceName}-get`, { id: id })
  }
  store(data) {
    return request(`${this.resorceName}-store`, { data: data })
  }
  update(id, data) {
    return request(`${this.resorceName}-update`, { id: id, data: data })
  }
  destroy(id) {
    return request(`${this.resorceName}-destroy`, { id: id })
  }
}

export default resource
