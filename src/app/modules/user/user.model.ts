import mongoose, { Schema, Model } from 'mongoose'

import { IUser } from './user.interface'

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password
      }
    },
    toObject: {
      transform(doc, ret) {
        delete ret.password
      }
    }
  }
)

// * Pre-save middleware to validate unique email
UserSchema.pre('save', async function (next) {
  const user = this as unknown as IUser

  if (user.isModified('email')) {
    const existingUser = await mongoose.models.User.findOne({
      email: user.email
    })
    if (existingUser) {
      const error = new Error('Email is already in use.')
      return next(error)
    }
  }

  next()
})

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema)

export default User
