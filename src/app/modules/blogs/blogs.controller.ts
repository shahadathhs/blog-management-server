import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import { httpStatusCode } from '../../enum/statusCode'
import AppError from '../../errors/AppError'
import sendError from '../../utils/sendError'
import sendResponse from '../../utils/sendResponse'
import simplifyError from '../../utils/simplifyError'

import Blog from './blogs.model'
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

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body
    const { id } = req.params

    if (!id) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'Blog id is required')
    }

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'Invalid blog id')
    }

    if (!payload) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'Blog data is required')
    }

    if (Object.keys(payload).length === 0) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'Blog data is required')
    }

    // * Check if the blog exists
    const blog = await Blog.findById(id)
    if (!blog) {
      throw new AppError(httpStatusCode.NOT_FOUND, 'Blog not found')
    }

    const result = await BlogService.updateBlog(payload, id)

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blog updated successfully',
      data: {
        ...result?.toObject(),
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
  createBlog,
  updateBlog
}
