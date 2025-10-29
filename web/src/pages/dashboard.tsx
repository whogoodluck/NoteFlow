import Loading from '@/components/loading'
import NoteCard from '@/components/note-card'
import { useGetAllNotes, useSearchNotes } from '@/hooks/useNote'
import type { Note } from '@/types/note'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const { data: allNotesData, isPending: isLoadingAll } = useGetAllNotes()
  const { data: searchData, isPending: isSearching } = useSearchNotes(debouncedQuery)

  const isSearchActive = debouncedQuery.trim().length > 0
  const notes: Note[] = isSearchActive ? searchData?.data || [] : allNotesData?.data || []

  const isPending = isSearchActive ? isSearching : isLoadingAll

  const handleClearSearch = () => {
    setSearchQuery('')
    setDebouncedQuery('')
  }

  if (isPending && !searchQuery) {
    return <Loading />
  }

  return (
    <section className='p-4 md:px-12'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-foreground text-3xl font-semibold'>Notes</h1>
      </div>

      <div className='relative mt-6'>
        <Search className='text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
        <input
          type='text'
          placeholder='Search notes...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='border-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border py-2 pr-10 pl-10 focus:ring-2 focus:outline-none'
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className='text-muted-foreground hover:text-foreground/80 absolute top-1/2 right-3 -translate-y-1/2'
          >
            <X className='h-5 w-5' />
          </button>
        )}
      </div>

      {isPending && searchQuery && (
        <div className='py-8 text-center text-gray-500'>
          <p>Searching...</p>
        </div>
      )}

      {!isPending && (
        <div className='flex w-full flex-col gap-4 py-4'>
          {notes.length > 0 ? (
            notes.map(note => <NoteCard key={note.id} note={note} />)
          ) : (
            <div className='py-12 text-center text-gray-500'>
              {isSearchActive ? (
                <>
                  <p className='text-lg font-medium'>No notes found</p>
                  <p className='text-sm'>Try searching with different keywords</p>
                </>
              ) : (
                <p className='text-lg font-medium'>No notes yet</p>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Dashboard
