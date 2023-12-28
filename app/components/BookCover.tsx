import Link from 'next/link'

type BookCoverProps = {
  id: number
  title: string
}

export default function BookCover({ id, title }: BookCoverProps) {
  return (
    <li key={id}>
      <Link href={`story/${id}`}>{title + id}</Link>
    </li>
  )
}
