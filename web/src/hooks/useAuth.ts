import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthContext } from '../contexts/AuthContext'
import { setToken } from '../lib/utils'
import { getUserByUsername, login, logout, register, validateToken } from '../services/user'

export function useLogin() {
  const navigate = useNavigate()
  const { setUser } = useAuthContext()

  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      setToken(data.data.token)
      setUser(data.data.user)
      navigate('/dashboard')

      toast.success('Login successful!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function useRegister() {
  const navigate = useNavigate()
  const { setUser } = useAuthContext()

  return useMutation({
    mutationFn: register,
    onSuccess: data => {
      setToken(data.data.token)
      setUser(data.data.user)
      navigate('/dashboard')
      toast.success('Registration successful!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const { clearAuth } = useAuthContext()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth()
      navigate('/login')
      toast.success('Logged out successfully')
    },
  })
}

export function useGetMyProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: validateToken,
  })
}

export function useGetUserProfileByUsername(username: string) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserByUsername(username),
  })
}
