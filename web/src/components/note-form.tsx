import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateNote, useUpdateNote } from '@/hooks/useNote'
import { createNoteSchema, type CreateNoteSchema } from '@/schemas/note.schema'
import type { Note } from '@/types/note'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface NoteFormProps {
  formType?: 'create' | 'update'
  note?: Note
}

function NoteForm({ formType = 'create', note }: NoteFormProps) {
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
    },
  })

  const { mutate: createPost, isPending: isCreating } = useCreateNote()
  const { mutate: updatePost, isPending: isUpdating } = useUpdateNote()

  const onSubmit = async (data: CreateNoteSchema) => {
    if (formType === 'create') {
      createPost(data)
    } else if (note) {
      updatePost({ noteId: note.id, noteData: data })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter Note title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter Note Content...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-4 w-full' size='lg'>
          {isCreating || isUpdating ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
              {formType === 'update' ? 'Updating...' : 'Creating...'}
            </>
          ) : formType === 'update' ? (
            'Update'
          ) : (
            'Create'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default NoteForm
