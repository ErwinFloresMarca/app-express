const mongoose = require('mongoose')

mongoose
  .connect('mongodb://127.0.0.1:27017/pruebaDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('conexion a mongodb exitosa')
  })
  .catch(err => {
    console.log('Error en la conexion', err)
  })
module.exports = mongoose
