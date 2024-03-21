import { NextRequest, NextResponse } from 'next/server'
import generateIncorrectCode from '@/utils/generateIncorrectCode'

interface Answer {
  song1: string
}

const answer = {
  song1: 'Alone'
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json() as Answer

  let code;

  if (data.song1 === answer.song1) {
    code = 'correct_code_here'
  } else {
    code = generateIncorrectCode()
  }

  return NextResponse.json({ code })
}
