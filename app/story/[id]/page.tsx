//komponent som visar en bok med ett id som är länkat i url:en

import { Chapter } from '@/app/lib/definitions'
import { getData } from '@/app/actions'
import BookContents from '../../ui/BookContents'

export default async function Book({ params }: { params: { id: number } }) {
  return <BookContents id={params.id} />
}
