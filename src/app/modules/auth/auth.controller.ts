import { Request, Response } from 'express'

import { httpStatusCode } from '../../enum/statusCode'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import { AuthService } from './auth.service'

const registerUser = catchAsync(async (req: Request, res: Response) => {
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
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body)

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'Login successful',
    data: {
      token: result.token
    }
  })
})

export const AuthController = {
  registerUser,
  loginUser
}
