import mongoose from 'mongoose'

import { TRole } from '../user/user.interface'

export interface IJwtPayload {
  userId: mongoose.Types.ObjectId
  role: TRole
}
