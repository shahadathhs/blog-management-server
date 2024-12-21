import { z } from 'zod'

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(3, { message: 'Title must be at least 3 characters' })
      .max(100, { message: 'Title must be at most 100 characters' }),
    content: z
      .string({ required_error: 'Content is required' })
      .min(10, { message: 'Content must be at least 10 characters' })
  })
})

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(3, { message: 'Title must be at least 3 characters' })
      .max(100, { message: 'Title must be at most 100 characters' }),
    content: z
      .string({ required_error: 'Content is required' })
      .min(10, { message: 'Content must be at least 10 characters' })
  })
})


export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema
}