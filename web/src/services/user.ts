import axios from 'axios'
import { getToken } from '../lib/utils'
import type { LoginSchema, RegisterSchema } from '../schemas/user.schema'

const baseUrl = '/api/users'

export const register = async (user: RegisterSchema) => {
  const res = await axios.post(`${baseUrl}/register`, user)

  return res.data
}

export const login = async (credentials: LoginSchema) => {
  const res = await axios.post(`${baseUrl}/login`, credentials)

  return res.data
}

export const logout = async () => {
  const res = await axios.post(`${baseUrl}/logout`, null, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const validateToken = async () => {
  const res = await axios.get(`${baseUrl}/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const getUserById = async (userId: string) => {
  const res = await axios.get(`${baseUrl}/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const getUserByUsername = async (username: string) => {
  const res = await axios.get(`${baseUrl}/${username}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}
