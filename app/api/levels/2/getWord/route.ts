import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import  generateIncorrectCode from '@/utils/generateIncorrectCode'
 
const secret = ['Ｎ', 'Ａ', 'Ｍ', 'Ｉ', 'Ｄ', 'Ａ']

const correct = 'tZlh8JZpEhSiHomd5mlaQz5SuqoHkQiDbk5rAzf'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  const index = Number(BigInt(session!.user.id!) % BigInt(6))
  const text = secret[index]

  return NextResponse.json({ a: text, b: index + 1 })
}

export async function POST(request: Request) {
  const data = await request.json()

  const text: string = data.text

  if (text !== secret.join('')) {
    return NextResponse.json({ text: generateIncorrectCode() })
  }

  return NextResponse.json({ text: correct })
}
