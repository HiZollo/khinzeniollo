'use client'
import styles from './TextInput.module.css'

interface TextInputParam {
  placeholder?: string,
  value?: string,
  [key: string]: unknown
}

export default function TextInput({ placeholder, value, ...rest }: TextInputParam) {
  return <input className={styles.input} type="text" placeholder={placeholder ?? ''} value={value ?? ''} {...rest} />
}
