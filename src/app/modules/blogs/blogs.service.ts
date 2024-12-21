import { FilterQuery, QueryOptions } from 'mongoose'

import { IBlog } from './blogs.interface'
import Blog from './blogs.model'

/**
 * Creates a new blog entry in the database.
 *
 * @param {IBlog} payload - The blog data to be saved.
 *
 * @returns {Promise<IBlog>} - A promise that resolves to the created blog object
 *                             with the author field populated with name and email.
 */

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  // * Create the blog and populate the author field with specific fields (name and email)
  const result = (await Blog.create(payload)).populate('author', 'name email')

  return result
}

/**
 * Updates a blog entry in the database.
 *
 * @param {Partial<IBlog>} payload - The updated blog data.
 * @param {string} id - The ID of the blog to update.
 *
 * @returns {Promise<IBlog | null>} - A promise that resolves to the updated blog
 *                                    object with the author field populated with
 *                                    name and email.
 */
const updateBlog = async (
  payload: Partial<IBlog>,
  id: string
): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true
  }).populate('author', 'name email')
  return result
}

/**
 * Deletes a blog entry from the database by its ID.
 *
 * @param {string} id - The ID of the blog to delete.
 *
 * @returns {Promise<IBlog | null>} - A promise that resolves to the deleted blog object,
 *                                    or null if the blog was not found.
 */

/**
 * Deletes a blog entry from the database by its ID.
 *
 * @param {string} id - The ID of the blog to delete.
 *
 * @returns {Promise<IBlog | null>} - A promise that resolves to the deleted blog object,
 *                                    or null if the blog was not found.
 */
const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id)
  return result
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Retrieves a list of blogs that match the given query and sort options.
 *
 * @param {FilterQuery<unknown>} query - The query filter to apply to the blog list.
 * @param {QueryOptions} sortOptions - The sort options to apply to the blog list.
 *
 * @returns {Promise<IBlog[] | null>} - A promise that resolves to an array of blog objects,
 *                                      or null if no blogs are found.
 */
/******  f0f02a8e-0423-441c-bb3e-144391a2cdcb  *******/
const getAllBlogs = async (
  query: FilterQuery<unknown>,
  sortOptions: QueryOptions
): Promise<IBlog[] | null> => {
  const result = await Blog.find(query).sort(sortOptions)
  return result
}

export const BlogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs
}
