'use client'
import { signIn, signOut } from 'next-auth/react'
import Button from '@/components/button'
import styles from './loginButton.module.css'

export function LoginButton() {
  return (
    <Button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={() => signIn('discord')}>Iniciar sesión</Button>
  )
}

export function LogoutButton() {
  return (
    <Button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={() => signOut()}>Cerrar sesión</Button>
  )
}
