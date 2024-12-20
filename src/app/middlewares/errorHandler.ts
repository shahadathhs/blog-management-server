import { ErrorRequestHandler, Request, Response } from 'express'

import { configuration } from '../config/configuration'
import simplifyError from '../utils/simplifyError'

const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response
) => {
  // * Log the error in development mode
  if (configuration.env === 'development') console.error(err)

  // * Simplify the error response
  const errorResponse = simplifyError(err)

  // * Send a generic error message
  res.status(errorResponse.statusCode).send({
    status: errorResponse.statusCode,
    success: false,
    message: errorResponse.message,
    errorSources: errorResponse.errorSources,
    stack: configuration.env === 'development' ? err : undefined
  })
}

export default errorHandler
