import { z } from 'zod'

const userValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required'
  }),
  email: z.string({
    required_error: 'Email is required'
  }),
  password: z.string({
    required_error: 'Password is required'
  }),
  role: z.enum(['admin', 'user']).optional(),
  isBlocked: z.boolean().optional()
})

export const UserValidation = {
  userValidationSchema
}
