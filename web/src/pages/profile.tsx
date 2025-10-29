import Loading from '@/components/loading'
import NoteCard from '@/components/note-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useGetMyProfile } from '@/hooks/useAuth'
import { useGetMyNotes } from '@/hooks/useNote'
import { cn } from '@/lib/utils'
import type { Note } from '@/types/note'
import type { User } from '@/types/user'
import { Calendar, Mail, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function Profile() {
  const { data, isPending } = useGetMyProfile()
  const { data: noteData, isPending: isLoading } = useGetMyNotes()

  if (isPending) {
    return <Loading />
  }

  const user: User = data.data
  const notes: Note[] = noteData.data

  return (
    <div className='min-h-screen px-4 md:px-12'>
      <div className='pt-6'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='border-primary/20 h-20 w-20 border-2 shadow-sm'>
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback className='text-5xl font-bold'>
                {user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
              <h1 className='text-2xl font-semibold text-gray-800'>{user.name}</h1>
              <p className='text-gray-500'>@{user.username}</p>
            </div>
          </div>

          <div>
            <Link
              to='/edit-profile'
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              <User2 className='mr-2 h-4 w-4' />
              Edit Profile
            </Link>
          </div>
        </div>

        <div className='mt-4 space-y-4 pl-2'>
          {user.bio && (
            <div className='leading-relaxed text-gray-700'>
              <h3 className='mb-1 font-semibold text-gray-800'>Bio</h3>
              <p>{user.bio}</p>
            </div>
          )}
          <div className='flex items-center gap-3 text-gray-600'>
            <Mail className='h-5 w-5' />
            <span>{user.email}</span>
          </div>
          <div className='flex items-center gap-3 text-gray-600'>
            <Calendar className='h-5 w-5' />
            <span>Last updated {new Date(user.updatedAt).toLocaleDateString()}</span>
          </div>

          <Badge variant='secondary' className='mt-1'>
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </Badge>

          <Separator />

          {isLoading ? (
            <Loading />
          ) : (
            <>
              <h2 className='px-1 text-2xl font-semibold'>My Notes</h2>
              {notes.map((note, index) => (
                <NoteCard key={index} note={note} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
