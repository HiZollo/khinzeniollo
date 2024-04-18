import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from '@/lib/auth'

const constraints = [
  '$n$ 有一個質因數是一對孿生質數中的一個',
  '存在階數為 $n$ 的有限體',
  '$n$ 可以寫成 $1919810$ 個質數的和',
  '$26.987 \\leq \\log_{10}{n} \\leq 27$',
  '$n$ 不是完全平方數',
  '令 $n = x^2 y^3 z^4 w^5$，$(x,y,z,w)$ 有唯一非負整數解',
  '$114514$ 可以從 $n$ 的其中一個質因數去掉頭和尾一些數字得到',
  '$\\cos{n\\pi}=-1$',
  '定義函數 $$f(x) = \\sum_{i=0}^{\\infty}\\frac{e^{-i\\pi}}{\\sec{(n^i\\pi x)}}$$則如果數列 $n_j \\rightarrow n$，保證 $f(n_j) \\rightarrow f(n)$'
]

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const id = session!.user.id!

  const cs = getItems(id)

  return NextResponse.json({ hints: cs })
}

function getItems(id: string) {
  let result = new Set()
  
  let i = id.length - 1
  while (result.size < 3 && i >= 0) {
    if (id[i] === '9') {
      i--; continue; 
    }

    result.add(constraints[id[i] as unknown as number])
    i--
  }

  return Array.from(result)
}
