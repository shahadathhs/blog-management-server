import { Router } from 'express'

import { Role } from '../../enum/role'
import authentication from '../../middlewares/authentication'
import validateRequest from '../../middlewares/validateRequest'

import { BlogController } from './blogs.controller'
import { BlogValidation } from './blogs.validation'

const router = Router()

router.post(
  '/',
  authentication(Role.User),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog
)

router.patch(
  '/:id',
  authentication(Role.User),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog
)

export const BlogRoutes = router
