/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
  path: '/users',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Users',
  meta: {
    title: 'Usuarios',
    icon: 'user',
    role: 'admin',
    permission: 'user-list'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user'),
      name: 'UsersList',
      meta: { title: 'Lista de Usuarios', noCache: true }
    }
  ]
}

export default userRouter
