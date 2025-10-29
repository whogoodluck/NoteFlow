import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/AuthContext'
import { useLogout } from '@/hooks/useAuth'
import { Loader2, LogOutIcon } from 'lucide-react'

function Dashboard() {
  const { user } = useAuthContext()
  const { mutate, isPending } = useLogout()

  const handleLogout = () => mutate()

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-4 text-3xl font-bold'>Hello {user?.name}</h1>
      <Button variant='outline' className='text-destructive' onClick={handleLogout}>
        {isPending ? (
          <Loader2 className='h-4 w-4 animate-spin' />
        ) : (
          <LogOutIcon className='h-4 w-4' />
        )}
      </Button>
    </div>
  )
}

export default Dashboard
