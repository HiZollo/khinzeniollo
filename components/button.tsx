import styles from './button.module.css'
import { ReactNode } from 'react'

interface ButtonParam {
  children: ReactNode,
  [key: string]: unknown
}

export default function Button({ children, ...rest }: ButtonParam) {
  return (
    <div className={styles.button} {...rest}>
      {children}
    </div>
  )
}
