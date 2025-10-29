import Loading from '@/components/loading'
import NoteCard from '@/components/note-card'
import { useGetAllNotes } from '@/hooks/useNote'
import type { Note } from '@/types/note'

function Dashboard() {
  const { data, isPending } = useGetAllNotes()

  if (isPending) {
    return <Loading />
  }

  const notes: Note[] = data.data || []

  return (
    <section className='p-4 md:px-12'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-primary text-3xl font-semibold'></h1>
      </div>
      <div className='flex w-full flex-col gap-4 py-4'>
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </div>
    </section>
  )
}

export default Dashboard
