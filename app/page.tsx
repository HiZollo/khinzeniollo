import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { LoginButton, LogoutButton } from './loginButton'
import { StickyScroll } from './levelSelect'
import { Session } from 'next-auth'
import { BlankDiv } from '@/components/blankDiv'
import iota from '@/utils/iota'

const SpanishNumber = [
  "Uno", "Dos", "Tres", "Cuatro", "Cinco", 
  "Seis", "Siete", "Ocho", "Nueve", "Diez",
  "Once", "Doce", "Trece", "Catorce", "Quince",
  "Dieciséis", "Diecisiete", "Dieciocho", "Diecinueve", "Veinte",
  "Veintiuno", "Veintidós", "Veintitrés", "Veinticuatro", "Veinticinco"
]
const LevelName = iota(25).map(() => "Unknown")

const content = iota(25).map((_, i) => ({ title: SpanishNumber[i], description: LevelName[i] }))

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return (
      <>
        <Title />
        <LoginButton />
      </>
    )
  }

  return (
    <>
      <Title />
      <StickyScroll content={content} />
      <BlankDiv height="120px" />
      <LogoutButton />
    </>
  )
}

function Title() {
  return <h1>Khinzeniollo</h1>
}
