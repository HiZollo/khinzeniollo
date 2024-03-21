'use client'
import styles from './TextInput.module.css'
import $ from 'clsx'

interface TextInputParam {
  placeholder?: string,
  value?: string,
  className?: string,
  [key: string]: unknown
}

export default function TextInput({ placeholder, value, className, ...rest }: TextInputParam) {
  return <input className={$(styles.input, className)} type="text" placeholder={placeholder ?? ''} value={value ?? ''} {...rest} />
}
