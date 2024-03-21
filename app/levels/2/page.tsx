'use client'
import { useSession } from 'next-auth/react'
import Input from '@/components/TextInput'
import Button from '@/components/button'
import { useState } from 'react'
import styles from './page.module.css'

const answerHash = 'd7ed8988a6ec1ffaacca5e6130a7bbd50c363a5afcc752631ab4b4ca152063a3f2b138837d8b5bc774f5635d94c86d2e'

export default function Dos() {
  const { data: session, status } = useSession()

  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [cache, setCache] = useState('')

  const handleChange: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget
    setText(value)

    digestMessage(value).then(setHash)
  }

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (cache) {
      alert(cache)
      return
    }

    fetch('/api/levels/2/getWord')
      .then(res => res.json())
      .then(({ a, b }) => {
        const text = `${a}:${b}`
        setCache(text)
        alert(text)
      })
  }
  
  return (
    <>
      <h1>Médico</h1>
      <p>醫生，我的病會好嗎？</p>
      <Input value={text} onChange={handleChange} />
      <div className={styles.buttons}>
        <Button onClick={handleClick}>治得好</Button>
        { hash === answerHash && <Button>治不好了</Button> }
      </div>
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

