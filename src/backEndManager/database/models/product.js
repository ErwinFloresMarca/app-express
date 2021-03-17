const { Schema, model } = require('../connect')
const mongoosePaginate = require('mongoose-paginate-v2')
const productSchena = new Schema({
  nombre: {
    type: String,
    unique: true,
    default: null,
    require: true
  },
  precio: {
    type: Number,
    default: null
  },
  total: {
    type: Number,
    default: null,
    require: true
  },
  foto: {
    type: Array,
    default: null
  },
  valoracion: {
    type: Number,
    default: null
  },
  cod_barras: {
    type: String,
    default: null
  }
})

productSchena.plugin(mongoosePaginate)

const Product = model('product', productSchena)

module.exports = Product
