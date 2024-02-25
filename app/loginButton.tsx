'use client'
import { signIn, signOut } from 'next-auth/react'
import Button from '@/components/button'
import styles from './loginButton.module.css'

export function LoginButton() {
  return (
    <Button onClick={() => signIn('discord')}>Iniciar sesión</Button>
  )
}

export function LogoutButton() {
  return (
    <Button onClick={() => signOut()}>Cerrar sesión</Button>
  )
}
