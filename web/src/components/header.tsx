import { Link, NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { useAuthContext } from '@/contexts/AuthContext'
import { useLogout } from '@/hooks/useAuth'
import { Loader2, LogOutIcon, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button, buttonVariants } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'

function Header() {
  const { pathname } = useLocation()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
  ]

  const { user, isAuthenticated } = useAuthContext()
  const { mutate, isPending } = useLogout()

  const handleLogout = () => mutate()

  return (
    <header className='bg-background flex h-24 w-full items-center justify-between border-b px-4 md:px-12'>
      <Link to='/' className=''>
        <h1 className='text-primary text-4xl font-extrabold'>NoteFlow</h1>
      </Link>

      {isAuthenticated && (
        <div className='hidden md:block'>
          <nav className='flex items-center space-x-4'>
            {navItems.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn('text-muted-foreground font-medium hover:underline', {
                  'text-foreground': pathname === item.href,
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

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
              <Button
                variant='outline'
                className='text-destructive hidden md:block'
                onClick={handleLogout}
              >
                {isPending ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <LogOutIcon className='h-4 w-4' />
                )}
              </Button>

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn('md:hidden', buttonVariants({ variant: 'outline' }))}
                  >
                    <User />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='mt-2 mr-2 flex flex-col gap-4 p-2'>
                    <Link to={`/profile`} className='flex items-center gap-2'>
                      <Avatar className='border-primary/20 h-12 w-12 border-2 shadow-sm'>
                        <AvatarImage src={user.picture} alt={user.name} />
                        <AvatarFallback className='text-3xl font-bold'>
                          {user.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className=''>
                        <h1 className='font-medium'>{user.name}</h1>
                        <p className='text-muted-foreground'>@{user.username}</p>
                      </div>
                    </Link>
                    <Button variant='outline' className='text-destructive' onClick={handleLogout}>
                      {isPending ? (
                        <>
                          <Loader2 className='h-4 w-4 animate-spin' /> Logging out
                        </>
                      ) : (
                        <>
                          <LogOutIcon className='h-4 w-4' /> Logout
                        </>
                      )}
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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
