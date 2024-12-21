import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import { httpStatusCode } from '../../enum/statusCode'
import AppError from '../../errors/AppError'
import sendError from '../../utils/sendError'
import sendResponse from '../../utils/sendResponse'
import simplifyError from '../../utils/simplifyError'
import Blog from '../blogs/blogs.model'
import User from '../user/user.model'

const blockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params

    if (!userId) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'User ID is required')
    }

    if (!mongoose.isValidObjectId(userId)) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'Invalid user ID')
    }

    const user = await User.findById(userId)
    if (!user) {
      throw new AppError(httpStatusCode.NOT_FOUND, 'User not found')
    }

    if (user.isBlocked) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'User is already blocked')
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    ).populate('role', 'name')

    if (!updatedUser) {
      throw new AppError(
        httpStatusCode.INTERNAL_SERVER_ERROR,
        'Failed to block user'
      )
    }

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'User blocked successfully',
      data: user
    })
  } catch (error) {
    const errorMessage = simplifyError(error)
    sendError(res, errorMessage)
    next(error)
  }
}

const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params

    if (!id) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'Blog ID is required')
    }
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'Invalid blog ID')
    }

    const blog = await Blog.findById(id)
    if (!blog) {
      throw new AppError(httpStatusCode.NOT_FOUND, 'Blog not found')
    }

    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
      throw new AppError(
        httpStatusCode.INTERNAL_SERVER_ERROR,
        'Failed to delete blog'
      )
    }

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    const errorMessage = simplifyError(error)
    sendError(res, errorMessage)
    next(error)
  }
}
export const AdminController = {
  blockUser,
  deleteBlog
}
