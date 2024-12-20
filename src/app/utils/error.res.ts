import { Response } from 'express'

import { configuration } from '../config/configuration'

const errorResponse = (
  res: Response,
  error: Error,
  message: string = 'Something Went Wrong.',
  status: number = 500
) => {
  res.status(status).send({
    status,
    success: false,
    message,
    error: error,
    stack: configuration.env === 'development' ? error.stack : undefined
  })
}

export default errorResponse
