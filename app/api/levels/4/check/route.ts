import { NextRequest, NextResponse } from 'next/server'
import generateIncorrectCode from '@/utils/generateIncorrectCode'

const answer: string[][] = [
  ["guipuzcoa", "gipuzkoa"], 
  ["navarre", "navarra", "nafarroa"], 
  ["castellon", "castello"], 
  ["pontevedra"], 
  ["burgos"], 
  ["zamora"], 
  ["albacete"], 
  ["almeria"]
]

function removeAccent(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function inAnswer(arr: string[]) {
  return arr.every(e => {
    return answer.some(a => a.includes(removeAccent(e)))
  })
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json() as string[]

  let code;

  if (data.length !== answer.length) {
    code = generateIncorrectCode()
  }
  else if (inAnswer(data)) {
    code = 'correct_code_here'
  }
  else {
    code = generateIncorrectCode()
  }

  return NextResponse.json({ code })
}
