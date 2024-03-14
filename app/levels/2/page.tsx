import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function Dos() {
  const session = await getServerSession(authOptions)
  return `Hello ${session!.user.name}`
}
