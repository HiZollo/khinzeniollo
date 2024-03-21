'use client'
import generateIncorrectCode from '@/utils/generateIncorrectCode'
import Input from '@/components/TextInput'
import Button from '@/components/button'
import { useState } from 'react'

export default function Tres() {
  const [disabled, setDisabled] = useState(false)
  const [ans, setAns] = useState('')

  const submit: React.MouseEventHandler = (e) => {
    if (disabled) return
    setDisabled(true)
    fetch('/api/levels/3/check', {
      method: 'POST',
      body: JSON.stringify({
        song1: ans
      })
    }).then(res => res.json()).then(data => {
      alert(data.code)
    })
  }

  return <>
    <h1>聽歌 2.0</h1>
    <Input value={ans} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAns(e.currentTarget.value)} />
    <Button onClick={submit} disabled={disabled}>Hello</Button>
  </>
}
