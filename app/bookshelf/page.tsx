import BookCover from '../components/BookCover';

interface Story {
  title: string,
  id: number,
  position: number
}
//Förmodligen fel/dumt?
type url = string | undefined

async function getData(url:url) {
  if (!url) {
    throw new Error('Url to backend missing') //avslutas funktionen när det blir error?
  }
  const res = await fetch(url as string) //kan jag ta bort as string nu?
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // Vad betyder detta? Läs på
    throw new Error('Failed to fetch my backend data')
  }
  return res.json()
}

export default async function BookShelf() {

  const data = await getData(process.env.MY_BACKEND_URL + "/stories")

  const results: Story[] = data.stories;

  return (
    <main>
      <ul>
        {results.map((story) =>
          <BookCover key={story.id} id={story.id} title={story.title}></BookCover>
        )}
      </ul>
    </main>
  )
}


//StarWarsTest

// interface StarWarsCharacter {
//   name: string;
// }
// type StarWarsCharacters = StarWarsCharacter[]

// async function getSWData() {
//   const res = await fetch(process.env.STARWARS_URL as string)
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch StarWars data')
//   }

//   return res.json()
// }

//I komponenten

//   const SWdata = await getSWData();
//   const results:StarWarsCharacter[] = SWdata.results;
//   const listItems = results.map((character, index) =>
//   <li key={index}>{character.name}</li>
// );
//   const listItems = results.map((character, index) =>
//   <li key={index}>{character.name}</li>
// );
// return (
//   <main className={styles.main}>
//     <div className={styles.description}>
//       <ul>
//         {listItems}
//       </ul>