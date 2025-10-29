import Loading from '@/components/loading'
import ProfileForm from '@/components/profile-form'
import { useGetMyProfile } from '@/hooks/useAuth'
import type { User } from '@/types/user'

function EditProfile() {
  const { data, isPending } = useGetMyProfile()

  if (isPending) return <Loading />

  const user: User = data.data

  return (
    <div className='mx-auto mt-24 flex max-w-xl flex-col justify-center rounded-xl px-4 py-8'>
      <h1 className='text-center text-3xl font-semibold'>Update Profile</h1>
      <ProfileForm user={user} />
    </div>
  )
}

export default EditProfile
