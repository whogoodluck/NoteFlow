import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/header'
import { ProtectedRoute, PublicRoute } from './components/route-guard'
import { AuthProvider } from './contexts/AuthContext'
import CreateNote from './pages/create-note'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/create-note'
          element={
            <ProtectedRoute>
              <CreateNote />
            </ProtectedRoute>
          }
        />

        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
