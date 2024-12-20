import { Document } from 'mongoose'

export type TRole = 'admin' | 'user'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: TRole
  isBlocked: boolean
  createdAt: Date
  updatedAt: Date
}
