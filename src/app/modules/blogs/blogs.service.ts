import { IBlog } from "./blogs.interface"
import Blog from "./blogs.model"

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = await Blog.create(payload)
  return result
}

export const BlogService = {
  createBlog
}