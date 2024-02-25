import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { LoginButton, LogoutButton } from './loginButton'
import { Session } from 'next-auth'

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
      Hola, {session.user!.name}
      <LogoutButton />
    </>
  )
}

function Title() {
  return <h1>Khinzeniollo</h1>
}
