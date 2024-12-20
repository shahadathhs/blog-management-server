import { Router } from 'express'

import { AdminRoutes } from '../modules/admin/admin.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { BlogRoutes } from '../modules/blogs/blogs.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/blogs',
    route: BlogRoutes
  },
  {
    path: '/admin',
    route: AdminRoutes
  }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
