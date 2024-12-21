import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import { httpStatusCode } from '../../enum/statusCode'
import AppError from '../../errors/AppError'
import { buildQuery } from '../../utils/queryBulider'
import sendError from '../../utils/sendError'
import sendResponse from '../../utils/sendResponse'
import simplifyError from '../../utils/simplifyError'

import Blog from './blogs.model'
import { BlogService } from './blogs.service'

/**
 * Creates a new blog
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next middleware function
 *
 * @throws {AppError} - If the blog data is invalid
 * @throws {AppError} - If the blog cannot be created
 *
 * @returns - A promise that resolves when the blog is created
 */
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

/**
 * Updates an existing blog
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next middleware function
 *
 * @throws {AppError} - If the blog data is invalid
 * @throws {AppError} - If the blog is not found
 * @throws {AppError} - If the user is not authorized to update the blog
 * @throws {AppError} - If the blog cannot be updated
 *
 * @returns - A promise that resolves when the blog is updated
 */
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

    // * Check if the user is the author of the blog
    if (blog.author.toString() !== req.user.userId) {
      throw new AppError(
        httpStatusCode.FORBIDDEN,
        'You are not authorized to update this blog'
      )
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

/**
 * Deletes an existing blog.
 *
 * @param {Request} req - The express request object containing the blog ID in the parameters and user ID in the user object.
 * @param {Response} res - The express response object to send the response.
 * @param {NextFunction} next - The express next middleware function.
 *
 * @throws {AppError} - If the blog ID is not provided or invalid.
 * @throws {AppError} - If the blog is not found.
 * @throws {AppError} - If the user is not authorized to delete the blog.
 * @throws {AppError} - If the blog cannot be deleted due to server error.
 *
 * @returns - A promise that resolves when the blog is successfully deleted.
 */

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { userId } = req.user

    if (!id) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'Blog id is required')
    }

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(httpStatusCode.BAD_REQUEST, 'Invalid blog id')
    }

    // * Check if the blog exists
    const blog = await Blog.findById(id)
    if (!blog) {
      throw new AppError(httpStatusCode.NOT_FOUND, 'Blog not found')
    }

    // * Check if the user is the author of the blog
    if (blog.author.toString() !== userId) {
      throw new AppError(
        httpStatusCode.FORBIDDEN,
        'You are not authorized to delete this blog'
      )
    }

    const result = await BlogService.deleteBlog(id)

    if (!result) {
      throw new AppError(
        httpStatusCode.INTERNAL_SERVER_ERROR,
        'Blog not deleted'
      )
    }

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    const errorResponse = simplifyError(error)
    sendError(res, errorResponse)
    next(error)
  }
}

/**
 * Fetches all blogs with support for search, sorting, and filtering.
 *
 * @param {Request} req - The express request object containing query parameters.
 * @param {Response} res - The express response object to send the response.
 * @param {NextFunction} next - The express next middleware function.
 *
 * @throws {AppError} - If there is a server error.
 *
 * @returns - A promise that resolves when the blogs are successfully fetched.
 */
const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // * Query parameters
    const { search, sortBy, sortOrder, filter } = req.query

    // * Use the generic query builder to get query and sort options
    const { query, sortOptions } = buildQuery(
      { search, sortBy, sortOrder, filter },
      ['title', 'content'], // * Search fields for blogs
      'author' // * Filter field for authorId
    )

    // * Fetch blogs using the generated query and sort options
    const result = await Blog.find(query).sort(sortOptions)

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blogs fetched successfully',
      data: result
    })
  } catch (error) {
    const errorResponse = simplifyError(error)
    sendError(res, errorResponse)
    next(error)
  }
}

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs
}
