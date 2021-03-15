import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const { ipcRenderer } = window.require('electron')

function sendSync(channel, data) {
  return new Promise((resolve, reject) => {
    var args = {
      data: data
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      args.token = getToken()
    }
    ipcRenderer.invoke(channel, args).then(response => {
      const res = response
      console.log(response)
      // if the custom code is not 20000, it is judged as an error.
      if (res.code !== 20000) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })

        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired; 40000: internal server error;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          // to re-login
          MessageBox.confirm('Tu token es invalido, debes iniciar sesion de nuevo.', 'Confirm logout', {
            confirmButtonText: 'Iniciar Sesion de nuevo',
            cancelButtonText: 'Cancelar',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
        return reject(res)
      } else {
        return resolve(res)
      }
    }).catch(err => {
      console.log('err', err) // for debug
      Message({
        message: err.message,
        type: 'error',
        duration: 5 * 1000
      })
      return reject(err)
    })
  })
}

export default sendSync
