'use client'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

export function WelcomeText() {
  const { data: session, status } = useSession()
  if (status === "authenticated") {
    return <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} style={{ color: 'var(--theme-color-darkest)' }}>
      Bienvenido, {session.user.name}.
    </motion.span>
  }

  return <></>
}
