import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import { configuration } from '../../config/configuration'
import { httpStatusCode } from '../../enum/statusCode'
import AppError from '../../errors/AppError'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'

import { IJwtPayload } from './auth.interface'
import { createToken } from './auth.utils'

/**
 * Registers a new user
 *
 * @param {IUser} payload - User data
 * @returns {Promise<IUser>} Created user
 */
const registerUser = async (payload: IUser): Promise<IUser> => {
  const { name, email, password } = payload

  // * Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })
  return user
}

/**
 * Logs in an existing user
 *
 * @param {Object} payload - Login data
 * @param {string} payload.email - User email
 * @param {string} payload.password - User password
 * @returns {Promise<Object>} Login result
 * @fulfil {Object} result - Login result
 * @fulfil {string} result.token - JSON Web Token
 * @reject {AppError} error - If user is not found, blocked or invalid credentials
 */
const loginUser = async (payload: {
  email: string
  password: string
}): Promise<{ token: string }> => {
  const { email, password } = payload

  const user = await User.findOne({ email }, { password: 1, role: 1 })

  if (!user) {
    throw new AppError(httpStatusCode.NOT_FOUND, 'User not found')
  }

  if (user.isBlocked) {
    throw new AppError(httpStatusCode.FORBIDDEN, 'User is blocked')
  }
  // * Compare password
  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if (!isPasswordMatched) {
    throw new AppError(httpStatusCode.UNAUTHORIZED, 'Invalid credentials')
  }
  // * Generate token
  const jwtPayload: IJwtPayload = {
    userId: user._id as mongoose.Types.ObjectId,
    role: user.role
  }

  const token = createToken(
    jwtPayload,
    configuration.jwt.secret as string,
    configuration.jwt.expiresIn as string
  )

  return { token }
}

export const AuthService = {
  registerUser,
  loginUser
}
