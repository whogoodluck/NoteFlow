import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  const token = localStorage.getItem('token')

  return token
}

export const removeToken = () => {
  localStorage.removeItem('token')
}
