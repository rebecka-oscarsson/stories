//startsidan (ska göras om till navigationen och bokhyllan ska visas först)

import Link from 'next/link'


export default async function Start() {
  return (
    <ul>
    <li >
      <Link href='/write'>write</Link>
    </li>
    <li >
      <Link href='/bookshelf'>bookshelf</Link>
    </li>
    </ul>
  )
}
