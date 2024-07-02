import BookCover from '@/app/ui/BookCover';
import { getData } from '@/app/actions'

interface Story {
  title: string,
  id: number,
  position: number
}

export default async function BookShelf() {

  const stories:Story[] = await getData("/stories")

  return (
    <main>
      <ul>
        {stories.map((story) =>
          <BookCover key={story.id} id={story.id} title={story.title}></BookCover>
        )}
      </ul>
    </main>
  )
}