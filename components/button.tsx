import styles from './button.module.css'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonParam {
  children: ReactNode,
  [key: string]: unknown
}

export default function Button({ children, ...rest }: ButtonParam) {
  return (
    <motion.div className={styles.button} {...rest}>
      {children}
    </motion.div>
  )
}
