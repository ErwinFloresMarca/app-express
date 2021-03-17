import resource from './resource'

class ProductoResource extends resource {
  constructor() {
    super('product')
  }
}

export default new ProductoResource()
