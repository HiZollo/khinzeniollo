'use client'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Input from '@/components/TextInput'
import Button from '@/components/button'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

export default function Dos() {
  const [text, setText] = useState('')

  useEffect(() => {
    fetch('/api/levels/2/getText')
      .then(res => res.json())
      .then(data => setText(data.text))
  }, [])

  return (
    <>
      <h1>Rosetta</h1>
      {text && <div className={styles.rosetta}>
        {text.match(/.{1,50}/g)!.map((v,i) => {
          return <p key={i}>{v}</p>
        })}
      </div>}
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

