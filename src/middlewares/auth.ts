import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import userService from '../services/user.service'
import config from '../utils/config'
import { HttpError } from '../utils/http-error'

export interface JWTPayload {
  id: string
  email: string
}

export interface ExpressRequest extends Request {
  user?: JWTPayload
}

async function requireAuth(req: ExpressRequest, _res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      throw new HttpError(401, 'Access token is required')
    }

    const decoded = jwt.verify(token, config.JWT_SECRET!) as JWTPayload

    const user = await userService.getOneByEmail(decoded.email)

    if (!user) {
      throw new HttpError(401, 'Invalid or expired token')
    }

    req.user = {
      id: user.id,
      email: user.email,
    }

    next()
  } catch (err) {
    next(err)
  }
}

export default {
  requireAuth,
}
