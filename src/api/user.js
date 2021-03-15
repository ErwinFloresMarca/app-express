import request from '@/utils/request'

import resource from './resource'

class UserResource extends resource {
  constructor() {
    super('user')
  }
}

export function login(data) {
  return request('auth-login', data)
}

export function getInfo(token) {
  return request('auth-info', { token: token })
}

export function logout() {
  return new Promise((resolve, reject) => {
    resolve({})
  })
}

export default new UserResource()
