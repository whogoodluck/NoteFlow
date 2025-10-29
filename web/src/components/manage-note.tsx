import { EditIcon, Ellipsis, Loader2Icon, Trash2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { cn } from '../lib/utils'

import { useDeleteNote } from '@/hooks/useNote'
import type { Note } from '@/types/note'
import { useAuthContext } from '../contexts/AuthContext'
import NoteForm from './note-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { buttonVariants } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

function ManageNote({ note }: { note: Note }) {
  const { user } = useAuthContext()

  const { mutate: deleteBug, isPending: isDeleting } = useDeleteNote()

  const handleDeletePost = () => {
    deleteBug(note.id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='text-primary cursor-pointer outline-none'>
          <Ellipsis strokeWidth={3} className='' />
          <span className='sr-only'>Toggle task menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-2 space-y-2 p-3'>
        <AlertDialog>
          {user && user.id === note.author.id && (
            <AlertDialogTrigger className='flex cursor-pointer items-center gap-2'>
              {isDeleting ? (
                <>
                  <Loader2Icon size={16} className='text-destructive h-4 w-4 animate-spin' />{' '}
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} className='text-destructive' /> Delete
                </>
              )}
            </AlertDialogTrigger>
          )}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this note.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeletePost}
                className={cn(buttonVariants({ variant: 'destructive' }))}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {user && user.id === note.authorId && (
          <Dialog>
            <DialogTrigger className='flex cursor-pointer items-center gap-2'>
              <EditIcon size={16} /> Edit
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className='text-center'>Update Note</DialogTitle>
              <NoteForm formType='update' note={note} />
            </DialogContent>
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ManageNote
