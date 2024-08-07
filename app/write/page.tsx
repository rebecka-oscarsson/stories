import { Form } from '@/app/ui/Form'
import { getData } from '@/app/actions'
import BookContents from '@/app/ui/BookContents';

export default async function Write(
) {
  const currentStory = await getData("/current_story");
  return (
    <main>
      <Form firstChapter = {currentStory.firstChapter} lastChapter = {currentStory.lastChapter}/>
      {currentStory.firstChapter ? <div>Your chapter will be the start of a new story</div> : <BookContents id={currentStory.id} />}
    </main>
  )
}