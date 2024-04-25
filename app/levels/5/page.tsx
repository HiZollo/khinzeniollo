'use client'
import 'katex/dist/katex.min.css'
import { useEffect, useRef, useState } from 'react'
import Latex from 'react-latex-next'
import Input from '@/components/TextInput'

export default function Cinco() {
  const [hints, setHints] = useState<string[]>([])
  const [number, setNumber] = useState<BigInt>(BigInt(0))

  useEffect(() => {
    fetch('/api/levels/5/gethint')
      .then(res => res.json())
      .then(h => setHints(h.hints))
  }, [])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    try {
      let n = BigInt(e.target.value)
      if (n < 0) return
      setNumber(n)
    } catch(e) {

    }
  }

  return (
    <>
      <h1>¿Cuánto?</h1>
      <ul style={{ textAlign: 'left', lineHeight: '30px' }}>
        {
          hints && hints.map((text, i) => {
            return <li key={i}><Latex>{text}</Latex></li>
          })
        }
      </ul>
      <Input value={number.toString()} onChange={handleChange} />
    </>
  )
}
