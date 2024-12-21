import { NextFunction, Request, Response } from 'express'

import { httpStatusCode } from '../../enum/statusCode'
import sendError from '../../utils/sendError'
import sendResponse from '../../utils/sendResponse'
import simplifyError from '../../utils/simplifyError'

import { AuthService } from './auth.service'

/**
 * Register a new user
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 *
 * @returns {Promise<void>}
 */
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AuthService.registerUser(req.body)

    sendResponse(res, {
      statusCode: httpStatusCode.CREATED,
      success: true,
      message: 'User registered successfully',
      data: {
        _id: result._id,
        name: result.name,
        email: result.email
      }
    })
  } catch (error) {
    const errorResponse = simplifyError(error)
    sendError(res, errorResponse)
    next(error)
  }
}

/**
 * Login an existing user
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 *
 * @returns - returns token
 */
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.loginUser(req.body)

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Login successful',
      data: {
        token: result.token
      }
    })
  } catch (error) {
    const errorResponse = simplifyError(error)
    sendError(res, errorResponse)
    next(error)
  }
}

export const AuthController = {
  registerUser,
  loginUser
}
