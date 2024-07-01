import { Form } from '@/app/form'
import { getData } from '@/app/actions'
import BookContents from '@/app/ui/BookContents';

export default async function Write(
) {
  const currentStoryId = await getData("/current_story");
  return (
    <main>
      <Form />
      {currentStoryId ? <BookContents id={currentStoryId} /> : 'loading' }
    </main>
  )
}