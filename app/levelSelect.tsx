'use client';
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';
import styles from './levelSelect.module.css'
import { BlankDiv } from '@/components/blankDiv'
import $ from 'clsx'
 
export const StickyScroll = ({
  content,
}: {
  content: {
    title: string
    description: string
  }[]
}) => {
  const [activeCard, setActiveCard] = useState(0)
  const ref = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"]
  })
  const cardLength = content.length
 
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 1/25 && latest <= breakpoint) {
        setActiveCard(() => index)
      }
    })
  })
 
  return (
    <motion.div
      id={styles.container}
      ref={ref}
    >
      <div className={styles.left}>
        <div>
          {content.map((item, index) => (
            <div key={item.title + index} className={styles.texts}>
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className={$(styles.text, styles.title)}
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className={$(styles.text, styles.description)}
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <BlankDiv height="55px" />
        </div>
      </div>
      <div className={styles.right}>
        <Link href={`/levels/${activeCard+1}`}>
          <motion.div
            animate={{
              background: "var(--theme-color-darker)"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 700, damping: 20 }}
            className={styles.button}
          >Empezar</motion.div>
        </Link>
      </div>
    </motion.div>
  )
}
