/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const productRouter = {
  path: '/products',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Products',
  meta: {
    title: 'Productos',
    icon: 'shopping',
    role: 'admin',
    permission: 'product-list'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/product'),
      name: 'ProductsList',
      meta: { title: 'Lista de Productos', noCache: true }
    }
  ]
}

export default productRouter
