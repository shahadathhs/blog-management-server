import { NextFunction, Request, Response } from 'express'

import { httpStatusCode } from '../../enum/statusCode'
import sendError from '../../utils/sendError'
import sendResponse from '../../utils/sendResponse'
import simplifyError from '../../utils/simplifyError'

import { BlogService } from './blogs.service'

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user
    const blogData = req.body

    const payload = { ...blogData, author: userId }

    const result = await BlogService.createBlog(payload)

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blog created successfully',
      data: {
        ...result.toObject(),
        createdAt: undefined,
        updatedAt: undefined,
        __v: undefined,
        isPublished: undefined
      }
    })
  } catch (error) {
    const errorResponse = simplifyError(error)
    sendError(res, errorResponse)
    next(error)
  }
}

export const BlogController = {
  createBlog
}
