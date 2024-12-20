import { Request, Response } from 'express'

import { configuration } from '../config/configuration'
import errorResponse from '../utils/error.res'

const errorHandler = (err: Error, req: Request, res: Response) => {
  // * Log the error in development mode
  if (configuration.env === 'development') console.error(err)

  // * Send a generic error message if the error wasn't handled
  if (!res.headersSent) {
    const statusCode = err.statusCode || 500
    const message =
      configuration.env === 'development'
        ? err.message
        : 'Internal Server Error'
    errorResponse(res, { message } as Error, statusCode)
  }
}

export default errorHandler
