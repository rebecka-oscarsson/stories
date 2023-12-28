import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { addChapter } from '@/app/actions'

const initialState = {
  message: null,
}

function SubmitButton() {
  //The useFormStatus Hook only returns status information for a parent <form>
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Submitting..." : "Submit chapter"}
    </button>
  )
}

export function Form() {
 
  const [state, formAction] = useFormState(addChapter, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="author">Author/pseodonym</label>
      <input type="text" id="author" name="author" required />
      <label htmlFor="chapter">Title of your chapter</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="chapter">Contents of your chapter</label>
      <textarea id="chapter" name="chapter" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message ? state?.message.toString() : null}
      </p>
    </form>
  )
}