import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { LoginButton, LogoutButton } from './loginButton'
import { Session } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return (
      <LoginButton />
    )
  }

  return (
    <>
      Hello, {session.user!.name} ({session.user!.id})!
      <LogoutButton />
    </>
  )
}
