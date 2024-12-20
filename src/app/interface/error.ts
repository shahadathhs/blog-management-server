export interface IErrorSource {
  path: string | number
  message: string
}

export interface IErrorResponse {
  statusCode: number
  message: string
  errorSources: IErrorSource[]
}

export interface IMongooseError extends Error {
  keyValue?: {
    [key: string]: string
  }
}
