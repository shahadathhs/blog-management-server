import { Request, Response } from 'express'

import { statusCode } from '../enum/statusCode'

const notFound = (req: Request, res: Response) => {
  res.send({
    status: statusCode.NOT_FOUND,
    success: false,
    message: 'API Not Found or Invalid URL!!',
  })
}

export default notFound
