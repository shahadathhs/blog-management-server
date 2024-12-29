import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { httpStatusCode } from '../enum/statusCode'
import AppError from '../errors/AppError'
import sendError from '../utils/sendError'
import simplifyError from '../utils/simplifyError'

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error) => {
      if (error instanceof jwt.JsonWebTokenError) {
        next(new AppError(httpStatusCode.UNAUTHORIZED, 'Invalid token!'))
      } else {
        const errorResponse = simplifyError(error)
        sendError(res, errorResponse)
        next(error)
      }
    })
  }
}

export default catchAsync