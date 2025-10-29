import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import Loading from './loading'

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) return <Loading />

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />
  }

  return <>{children}</>
}

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) return <Loading />

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}
