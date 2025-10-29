import NoteForm from '@/components/note-form'

function CreateNote() {
  return (
    <div className='mx-auto mt-24 flex max-w-xl flex-col justify-center rounded-xl px-4 py-8'>
      <h1 className='text-center text-3xl font-semibold'>Create New Note</h1>
      <NoteForm />
    </div>
  )
}

export default CreateNote
