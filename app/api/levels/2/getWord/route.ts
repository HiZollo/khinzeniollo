import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
 
const secret = ['Ｎ', 'Ａ', 'Ｍ', 'Ｉ', 'Ｄ', 'Ａ']

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  const index = Number(BigInt(session!.user.id!) % BigInt(6))
  const text = secret[index]

  return NextResponse.json({ a: text, b: index + 1 })
}
