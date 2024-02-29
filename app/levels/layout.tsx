'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './layout.module.css'
import Button from '@/components/button'

interface LayoutParam {
  children: React.ReactNode
}

export default function LevelLayout({ children  }: LayoutParam) {
  const pathname = usePathname()

  const level = +pathname.slice('/levels/'.length)

  if (isNaN(level)) return <></>

  return <>
    <div id={styles.background}>{level}</div>
    <section>{children}</section>
    <Link href='/'>
      <Button>Volver</Button>
    </Link>
  </>
}
