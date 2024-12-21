import mongoose, { Document } from 'mongoose'

export interface IBlog extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | mongoose.Schema.Types.ObjectId;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
