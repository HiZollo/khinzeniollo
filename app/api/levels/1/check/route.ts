import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json() as string[]
  return NextResponse.json({ code: 'correct_code_here' })
}
