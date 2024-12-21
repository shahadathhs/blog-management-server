import mongoose, { Schema, Model } from 'mongoose'

import { IBlog } from './blogs.interface'

const BlogSchema: Schema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', BlogSchema)

export default Blog
