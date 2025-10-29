import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/header'
import { ProtectedRoute, PublicRoute } from './components/route-guard'
import CreateNote from './pages/create-note'
import Dashboard from './pages/dashboard'
import EditProfile from './pages/edit-profile'
import Login from './pages/login'
import NotFound from './pages/not-found'
import Profile from './pages/profile'
import Register from './pages/register'

function App() {
  return (
    <>
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
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/edit-profile'
          element={
            <ProtectedRoute>
              <EditProfile />
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

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
