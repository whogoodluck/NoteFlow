import { NextFunction, Request, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth'
import { loginSchema, registerSchema } from '../schemas/user.schema'
import userService from '../services/user.service'
import { HttpError } from '../utils/http-error'

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = registerSchema.parse(req.body)

    const existingUser = await userService.getOneByEmail(email)

    if (existingUser) {
      throw new HttpError(400, 'User already exists')
    }

    const hashedPassword = await userService.hashPassword(password)

    const user = await userService.createNewUser({
      email,
      name,
      username: email.split('@')[0],
      password: hashedPassword,
    })

    const token = userService.signToken({
      id: user.id,
      email: user.email,
    })

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: { ...user, token },
    })
  } catch (err) {
    next(err)
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await userService.getOneByEmail(email)

    if (!user) {
      throw new HttpError(401, 'Invalid email or password')
    }

    const isValidPassword = await userService.verifyPassword(password, user.password)

    if (!isValidPassword) {
      throw new HttpError(401, 'Invalid email or password')
    }

    const token = userService.signToken({
      id: user.id,
      email: user.email,
    })

    const { password: _, ...userWithoutPassword } = user

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data: { ...userWithoutPassword, token },
    })
  } catch (err) {
    next(err)
  }
}

function logout(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ status: 'success', message: 'User logged out successfully' })
  } catch (err) {
    next(err)
  }
}

async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers()
    res.status(200).json({ status: 'success', message: 'Users fetched successfully', data: users })
  } catch (err) {
    next(err)
  }
}

async function validateToken(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const user = await userService.getOneById(req.user!.id)

    if (!user) {
      throw new HttpError(401, 'Invalid or expired token')
    }

    res.status(200).json({
      status: 'success',
      message: 'User validated successfully',
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

async function getUserByUsername(req: Request, res: Response, next: NextFunction) {
  try {
    const { username } = req.params

    const user = await userService.getOneByUsername(username)

    if (!user) {
      throw new HttpError(404, 'User not found')
    }

    res.status(200).json({
      status: 'success',
      message: 'User fetched successfully',
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login,
  logout,
  getUsers,
  validateToken,
  getUserByUsername,
}
