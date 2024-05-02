'use client'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Input from '@/components/TextInput'
import Button from '@/components/button'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

export default function Dos() {
  const [text, setText] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    fetch('/api/levels/2/getText')
      .then(res => res.json())
      .then(data => setText(data.text))
  }, [])

  useEffect(() => {
    if (!text) return
    const lines = text.match(/.{1,50}/g)
    if (!lines || !lines.length) return
    
    if (!canvasRef.current) return

    canvasRef.current.height = lines.length * 35
    const ctx = canvasRef.current.getContext('2d')!

    ctx.setTransform(1, 0, 0, 1, 300, 35);
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    ctx.font = '20px monospace'
    ctx.fillStyle = '#ffffff'

    lines.forEach((line, i) => {
      Array.prototype.forEach.call(line, (text, j) => {
        const r = Math.random() * Math.PI / 360
        ctx.rotate(r)
        ctx.fillText(text, j*12 + 2*(2 * Math.random() - 1) - 300, 2*(2 * Math.random() - 1))
        ctx.rotate(-r)
      })

      // ctx.fillText(line, 0, (i+1)*35)
      ctx.scale(-1,1)
      ctx.translate(0, 35)
    })
  }, [text])

  return (
    <>
      <h1>Rosetta</h1>
      <canvas ref={canvasRef} width={600} height={0}></canvas>
    </>
  )
}

async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-384", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

