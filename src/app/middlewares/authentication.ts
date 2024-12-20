import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'

import { configuration } from '../config/configuration'
import { httpStatusCode } from '../enum/statusCode'
import AppError from '../errors/AppError'
import { TRole } from '../modules/user/user.interface'
import User from '../modules/user/user.model'
import catchAsync from '../utils/catchAsync'

const authentication = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // * checking if the token is missing
    if (!token) {
      throw new AppError(httpStatusCode.UNAUTHORIZED, 'You are not authorized!')
    }

    // * checking if the given token is valid
    const decoded = jwt.verify(
      token,
      configuration.jwt.secret as string
    ) as JwtPayload

    const { role, userId } = decoded

    //  * checking if the user exists
    const user = await User.findOne({ _id: userId as mongoose.Types.ObjectId })

    if (!user) {
      throw new AppError(httpStatusCode.NOT_FOUND, 'This user is not found !')
    }

    // * checking if the user is already blocked
    if (user.isBlocked) {
      throw new AppError(
        httpStatusCode.UNAUTHORIZED,
        'Your account is blocked !'
      )
    }

    // * checking if the user has the required role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatusCode.UNAUTHORIZED,
        'You are not authorized to perform this action !'
      )
    }
    // * if everything is ok, then add the user to the request object
    req.user = decoded as JwtPayload

    // * move to the next middleware
    next()
  })
}

export default authentication
