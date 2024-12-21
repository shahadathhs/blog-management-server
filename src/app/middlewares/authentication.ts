import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import { configuration } from '../config/configuration'
import { httpStatusCode } from '../enum/statusCode'
import AppError from '../errors/AppError'
import { IJwtPayload } from '../modules/auth/auth.interface'
import { TRole } from '../modules/user/user.interface'
import User from '../modules/user/user.model'
import sendError from '../utils/sendError'
import simplifyError from '../utils/simplifyError'

const authentication = (...requiredRoles: TRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization

      // * Check if the Authorization header is present
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError(
          httpStatusCode.UNAUTHORIZED,
          'You are not authorized!'
        )
      }

      // Extract the token
      const token = authHeader.split(' ')[1]

      // * Verify the token
      const decoded = jwt.verify(
        token,
        configuration.jwt.secret as string
      ) as IJwtPayload

      if (!decoded) {
        throw new AppError(httpStatusCode.UNAUTHORIZED, 'Invalid token!')
      }

      // * Validate the token payload
      const { userId, role } = decoded
      if (!userId || !mongoose.isValidObjectId(userId)) {
        throw new AppError(
          httpStatusCode.UNAUTHORIZED,
          'Invalid userId in token!'
        )
      }

      if (!role) {
        throw new AppError(
          httpStatusCode.UNAUTHORIZED,
          'Missing role in token!'
        )
      }

      // * Check if the user exists
      const user = await User.findOne({
        _id: userId as mongoose.Types.ObjectId
      })

      if (!user) {
        throw new AppError(httpStatusCode.NOT_FOUND, 'This user is not found!')
      }

      // * Check if the user is blocked
      if (user.isBlocked) {
        throw new AppError(
          httpStatusCode.UNAUTHORIZED,
          'Your account is blocked!'
        )
      }

      // * Check if the user has the required role
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatusCode.UNAUTHORIZED,
          'You are not authorized to perform this action!'
        )
      }

      // * Attach user information to the request object
      req.user = decoded

      // * Move to the next middleware
      next()
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        next(new AppError(httpStatusCode.UNAUTHORIZED, 'Invalid token!'))
      } else {
        const errorResponse = simplifyError(error)
        sendError(res, errorResponse)
        next(error)
      }
    }
  }
}

export default authentication
