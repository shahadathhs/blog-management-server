import jwt from 'jsonwebtoken'

import { IJwtPayload } from './auth.interface'

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn
  })
}
