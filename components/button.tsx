import styles from './button.module.css'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import $ from 'clsx'

interface ButtonParam {
  children: ReactNode,
  className?: string,
  disabled?: boolean,
  [key: string]: unknown
}

export default function Button({ children, className, disabled = false, ...rest }: ButtonParam) {
  return (
    <motion.div className={$(styles.button, className, { [styles.disabled]: disabled })} {...rest}>
      {children}
    </motion.div>
  )
}
