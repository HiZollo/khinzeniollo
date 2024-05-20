import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { LoginButton, LogoutButton } from './loginButton'
import { StickyScroll } from './levelSelect'
import { WelcomeText } from './welcomeText'
import { Session } from 'next-auth'
import { BlankDiv } from '@/components/blankDiv'
import iota from '@/utils/iota'

const SpanishNumber = [
  "Uno", "Dos", "Tres", "Cuatro", "Cinco", 
  "Bonus I", "Bonus II"
]

const LevelName = [
  "¿Qué cosa hay aquí?", "Rosetta", "", "¿Dónde están?", "¿Cuánto?",
  "¿Cuál es?", "¿Quién es?"
]

const content = iota(7).map((_, i) => ({ title: SpanishNumber[i], description: LevelName[i] }))

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
      <WelcomeText />
      <StickyScroll content={content} />
      <BlankDiv height="120px" />
      <LogoutButton />
    </>
  )
}

function Title() {
  return <h1>Khinzeniollo</h1>
}
