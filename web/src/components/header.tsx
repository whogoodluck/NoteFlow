import { Link, NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { useAuthContext } from '@/contexts/AuthContext'
import { useLogout } from '@/hooks/useAuth'
import { Loader2, LogOutIcon } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'

function Header() {
  const { pathname } = useLocation()

  const { isAuthenticated } = useAuthContext()
  const { mutate, isPending } = useLogout()

  const handleLogout = () => mutate()

  return (
    <header className='bg-background flex h-24 w-full items-center justify-between border-b px-4 md:px-12'>
      <Link to='/' className=''>
        <h1 className='text-primary text-4xl font-extrabold'>NoteFlow</h1>
      </Link>{' '}
      <div>
        <div className='flex items-center space-x-4'>
          {isAuthenticated ? (
            <>
              <NavLink
                to={pathname === '/create-note' ? '/' : '/create-note'}
                className={cn(buttonVariants({ variant: 'secondary' }))}
              >
                {pathname !== '/create-note' ? 'Create Note' : 'Go Home'}
              </NavLink>
              <Button variant='outline' className='text-destructive' onClick={handleLogout}>
                {isPending ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <LogOutIcon className='h-4 w-4' />
                )}
              </Button>
            </>
          ) : (
            <NavLink
              to={pathname === '/login' ? '/register' : '/login'}
              className={cn(buttonVariants({ variant: 'secondary' }))}
            >
              {pathname === '/login' ? 'Register' : 'Login'}
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
