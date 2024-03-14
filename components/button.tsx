import styles from './button.module.css'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import $ from 'clsx'

interface ButtonParam {
  children: ReactNode,
  className?: string,
  [key: string]: unknown
}

export default function Button({ children, className, ...rest }: ButtonParam) {
  return (
    <motion.div className={$(styles.button, className)} {...rest}>
      {children}
    </motion.div>
  )
}
