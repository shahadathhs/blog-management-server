import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

import catchAsync from '../utils/catchAsync'

export default function validateRequest(schema: ZodSchema) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies
    })

    next()
  })
}
