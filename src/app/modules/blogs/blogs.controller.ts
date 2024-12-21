import { NextFunction, Request, Response } from 'express'

import { httpStatusCode } from '../../enum/statusCode'
import sendError from '../../utils/sendError'
import sendResponse from '../../utils/sendResponse'
import simplifyError from '../../utils/simplifyError'

import { BlogService } from './blogs.service'

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.createBlog(req.body)
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blog created successfully',
      data: result
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
