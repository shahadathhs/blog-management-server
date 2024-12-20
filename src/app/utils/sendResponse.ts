import { Response } from 'express'

interface IResponse {
  statusCode: number
  success: boolean
  message: string
  data?: object | Array<object> | null
}

const sendResponse = (res: Response, data: IResponse) => {
  const response: IResponse = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message
  }

  // * Add the `data` key only if it is defined
  if (data.data !== undefined) {
    response.data = data.data
  }

  res.status(data.statusCode).json(response)
}

export default sendResponse
