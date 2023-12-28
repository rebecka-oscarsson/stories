//komponent som visar bok med det id som står i url:en

type Chapter = {
  id: number
  story_id: number
  title: string
  author: string
  created_at: Date
  contents: string
}
//Förmodligen fel/dumt?
type url = string | undefined

export default async function Book({ params }: { params: { id: number } }) {

  const data = await getData(`${process.env.MY_BACKEND_URL}/chapters/${params.id}`)
  const results: Chapter[] = data.chapters;
  
  return (
    <main>
      <ul>
        {results.map((chapter) =>
          <li key={params.id}>{chapter.title} {chapter.contents} {chapter.created_at.toString()}</li>
        )}
      </ul>
    </main>
  )
}

// export default function Page({ params }: { params: { id: number } }) {
//     return <div>BokID: {params.id}</div>
//   }

  async function getData(url:url) {
    if (!url) {
      throw new Error('Url to backend missing') //avslutas funktionen när det blir error?
    }
    const res = await fetch(url
    ) 
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // Vad betyder detta? Läs på
      throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
  }
  