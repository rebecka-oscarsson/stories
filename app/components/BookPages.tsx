//hämta kapitel för bok en med id x

type BookPagesProps = [{
  id: number
  story_id: number
  title: string
  author: string
  created_at: Date
  contents: string
}]

export default function BookPages(props: { id, story_id, title, author, created_at, contents }:BookPagesProps) {
  return (
    <li key={id}>
      <Link href={`story/${id}`}>{title + id}</Link>
    </li>
  )
}
