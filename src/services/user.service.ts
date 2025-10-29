import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { JWTPayload } from '../middlewares/auth'
import { RegisterSchema, UpdateUserSchema } from '../schemas/user.schema'
import config from '../utils/config'

async function hashPassword(password: string) {
  const saltRounds = 10

  return await bcrypt.hash(password, saltRounds)
}

async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

function signToken(data: JWTPayload) {
  const token = jwt.sign(data, config.JWT_SECRET!, {
    expiresIn: '7d',
  })

  return token
}

function verifyToken(token: string) {
  const decoded = jwt.verify(token, config.JWT_SECRET!) as JWTPayload

  return decoded
}

async function createNewUser(data: RegisterSchema) {
  const user = await prisma.user.create({
    data: data,
    omit: {
      password: true,
    },
  })

  return user
}

async function getAllUsers() {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return users
}

async function getOneById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    omit: {
      password: true,
    },
  })

  return user
}

async function getOneByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}

async function getOneByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    omit: {
      password: true,
    },
  })

  return user
}

async function updateUserById(id: string, data: UpdateUserSchema) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: data,
    omit: {
      password: true,
    },
  })

  return user
}

export default {
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
  createNewUser,
  getAllUsers,
  getOneById,
  getOneByEmail,
  getOneByUsername,
  updateUserById,
}
