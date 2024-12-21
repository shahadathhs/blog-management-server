import { IBlog } from './blogs.interface'
import Blog from './blogs.model'

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  // * Create the blog and populate the author field with specific fields (name and email)
  const result = (await Blog.create(payload)).populate('author', 'name email')

  return result
}

export const BlogService = {
  createBlog
}
