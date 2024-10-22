import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import Input from '@/components/TextInput'
import { getServerSession } from 'next-auth/next'
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
  '定義函數 $$f(x) = \\sum_{i=0}^{\\infty}\\frac{e^{-i\\pi}}{\\sec{(n^i\\pi x)}}$$則如果數列 $n_j$ 收斂到 $n$，則數列 $f(n_j)$ 收斂到 $f(n)$'
]

export default async function Cinco() {
  const session = await getServerSession(authOptions)
  const id = session!.user.id!

  const hints = getItems(id)

  return (
    <>
      <h1>¿Cuánto?</h1>
      { hints && <ul style={{ textAlign: 'left', lineHeight: '30px' }}>
        {hints.map((text, i) => 
           <li key={i}><Latex>{text}</Latex></li>
        )}
      </ul>}
      <p>以下是提示一新增的條件：</p>
      <ul style={{ textAlign: 'left', lineHeight: '30px' }}>
        <li><Latex>$n$ 可以寫成 $9$ 個立方數的和</Latex></li>
        <li><Latex>$n$ 的每位數字和落在 $150$ 和 $160$ 之間（包含邊界）</Latex></li>
        <li><Latex>$n^{"{"}100{"}"} = 1 + k \cdot 5^3$，其中 $k$ 是一個整數</Latex></li>
      </ul>
    </>
  )
}

function getItems(id: string): string[] {
  let result = new Set<string>()
  
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
