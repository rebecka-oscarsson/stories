'use client'

import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { addChapter } from '@/app/actions'

type FormProps = {
  firstChapter: boolean,
  lastChapter: boolean
};

const initialState = 'write your chapter'

function SubmitButton() {
  //The useFormStatus Hook only returns status information for a parent <form>
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Submitting..." : "Submit chapter"}
    </button>
  )
}

export function Form({ firstChapter, lastChapter }: FormProps) {
  const [state, formAction] = useFormState(addChapter, initialState)

  return (

    <form action={formAction} key={state}>
      {lastChapter && <div>This is the last chapter, please write an ending for the story</div>}
      {/* key med state används för att formuläret ska tömmas när man skickat in kapitlet och state ändras */}
      <label htmlFor="author">Author/pseodonym</label>
      <input type="text" id="author" name="author" required />
      {firstChapter && <div><label htmlFor="storyTitle">Title for the new story</label>
        <input type="text" id="storyTitle" name="storyTitle" required /></div>}
      <label htmlFor="chapter">Title of your chapter</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="chapter">Contents of your chapter</label>
      <textarea id="chapter" name="chapter" required />
      <SubmitButton />
      {state}
    </form>
  )
}