// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const newStore = {
  get: () => {
    return localStorage[TokenKey] === '' ? null : localStorage[TokenKey]
  },
  set: (token) => {
    localStorage[TokenKey] = token
  },
  remove: () => {
    localStorage[TokenKey] = ''
  }
}

export function getToken() {
  return newStore.get()
}

export function setToken(token) {
  return newStore.set(token)
}

export function removeToken() {
  return newStore.remove()
}
