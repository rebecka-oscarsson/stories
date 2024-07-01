//Komponent som visar en berättelse med ett id som kan komma som parameter från route eller som prop
//detta ska vara server-komponent för det är dumt att behöva hämta flera ggr,
//först hämta komponenten som sedan i sin tur hämtar datan
//Endast komponenter som interagerar med användaren måste vara client components
//En client component kan inte importera en server component men det går att skicka in den som en prop (children)

import { Chapter } from '@/app/lib/definitions'
import { getData } from '@/app/actions';

export default async function BookContents({id}: {id: number}) {
  
const chapters:Chapter[] = await getData(`/chapters/${id}`);

  return (
    <main>
      <ul>
        {chapters.map((chapter) =>
          <li key={chapter.id}>{chapter.title} {chapter.contents} {chapter.created_at.toString()}</li>
        )}
      </ul>
    </main>
  )
}
