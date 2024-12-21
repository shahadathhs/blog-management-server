import { IBlog } from './blogs.interface'
import Blog from './blogs.model'

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  // * Create the blog and populate the author field with specific fields (name and email)
  const result = (await Blog.create(payload)).populate('author', 'name email')

  return result
}

const updateBlog = async (
  payload: Partial<IBlog>,
  id: string
): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true
  }).populate('author', 'name email')
  return result
}

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id)
  return result
}

export const BlogService = {
  createBlog,
  updateBlog,
  deleteBlog
}
