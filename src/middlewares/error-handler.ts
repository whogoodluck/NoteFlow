import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import logger from '../utils/logger'

interface ErrorType extends Error {
  statusCode?: number
  code?: string
  details?: { message: string }[]
}

const getErrorResponse = (err: ErrorType) => {
  const types: Record<string, { statusCode: number; message: string }> = {
    JsonWebTokenError: {
      statusCode: 403,
      message: 'invalid token',
    },
    TokenExpiredError: {
      statusCode: 403,
      message: 'token expired',
    },
    HttpError: {
      statusCode: err.statusCode || 400,
      message: err.message,
    },
    default: {
      statusCode: err.statusCode || 500,
      message: 'internal server error',
    },
  }

  return types[err.name] || types['default']
}

const getZodErrorMessage = (error: ZodError): string => {
  const errors = error.issues.map(issue => {
    return `${issue.path.join('.')}: ${issue.message}`
  })

  return errors.join(', ')
}

const getZodErrorResponse = (err: ZodError) => {
  return {
    statusCode: 400,
    message: getZodErrorMessage(err),
  }
}

const errorHandler = (
  err: ErrorType | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Logging
  if (err instanceof ZodError) {
    logger.error('Validation Error ->', getZodErrorMessage(err))
  } else {
    logger.error('Error ->', err.message)
  }

  let statusCode: number
  let message: string

  // Handle different error types
  if (err instanceof ZodError) {
    const response = getZodErrorResponse(err)
    statusCode = response.statusCode
    message = response.message
  } else {
    const response = getErrorResponse(err as ErrorType)
    statusCode = response.statusCode
    message = response.message
  }

  res.status(statusCode).json({ status: 'error', message })
}

export default errorHandler
