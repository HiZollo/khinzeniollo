import Input from '@/components/TextInput'
import Button from '@/components/button'
import { createCanvas, loadImage } from 'canvas'
import Image from 'next/image'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import fs from 'node:fs'


const idmap: Array<[string, number]> = [
  ['ea4acefd3e359eef', 870],
  ['a8f6645229383bdf', 720],
  ['ecd464b9b2e5fd9c', 780],
  ['3bd4b6ba8bacc975', 870]
]

export default async function Dos() {
  const session = (await getServerSession(authOptions))!

  const index = getSectionIndex(session.user.id!)

  const data = idmap[index]

  return (
    <>
      <h1>Rosetta</h1>
      <p>Las losas desenterrada en el este de España.</p>
      <p>Esto es la última leyenda creada por la leyenda.</p>
      <p>Léela y responde las preguntas.</p>
      <Image src={`/${data[0]}.png`} alt="" width={600} height={data[1]} />
    </>
  )
}

function getSectionIndex(id: string) {
  return Number(BigInt(id) % BigInt(4))
}
