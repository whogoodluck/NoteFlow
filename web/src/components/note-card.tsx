import { Dot } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { formatTimeAgo } from '@/lib/utils'
import type { Note } from '@/types/note'

import ManageNote from './manage-note'
import { Badge } from './ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

interface NoteCardProps {
  note: Note
}

function NoteCard({ note }: NoteCardProps) {
  return (
    <Card style={{ backgroundColor: note.backgroundColor }} className='border shadow-none'>
      <CardHeader className='flex items-center justify-between'>
        <NavLink to={`/notes/${note.id}`}>
          <CardTitle className='line-clamp-2'>{note.title}</CardTitle>
        </NavLink>

        <ManageNote note={note} />
      </CardHeader>
      <CardContent>
        <NavLink to={`/notes/${note.id}`}>
          <article className='text-foreground line-clamp-3 text-sm'>{note.content}</article>{' '}
        </NavLink>
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <Badge className='text-primary bg-secondary'>{note.author.username}</Badge>
        <div className='flex items-center text-sm'>
          <Dot size={24} className='text-foreground' />
          {formatTimeAgo(new Date(note.createdAt))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default NoteCard
