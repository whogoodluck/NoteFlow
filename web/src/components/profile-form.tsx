import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateProfile } from '@/hooks/useAuth'
import { updateUserSchema, type UpdateUserSchema } from '@/schemas/user.schema'
import type { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'

import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

function ProfileForm({ user }: { user: User }) {
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio,
    },
  })

  const { mutate, isPending: isUpdating } = useUpdateProfile()

  const onSubmit = (data: UpdateUserSchema) => mutate(data)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter Bio' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-4 w-full' size='lg'>
          {isUpdating ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating...
            </>
          ) : (
            'Update'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm
