'use client'
import 'katex/dist/katex.min.css'
import { useEffect, useRef, useState } from 'react'
import Latex from 'react-latex-next'

export default function Cinco() {
  const [hints, setHints] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/levels/5/gethint')
      .then(res => res.json())
      .then(h => setHints(h.hints))
  }, [])

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
    </>
  )
}
