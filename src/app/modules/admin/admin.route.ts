import { Router } from 'express'

import { Role } from '../../enum/role'
import authentication from '../../middlewares/authentication'

import { AdminController } from './admin.controller'

const router = Router()

router.patch(
  '/users/:userId/block',
  authentication(Role.Admin),
  AdminController.blockUser
)

router.delete(
  '/blogs/:id',
  authentication(Role.Admin),
  AdminController.deleteBlog
)

export const AdminRoutes = router
