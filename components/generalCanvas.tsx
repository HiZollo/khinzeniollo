"use client"

import { useEffect, useRef } from "react";

interface GeneralCanvasProps {
  animate: (ctx: CanvasRenderingContext2D) => void
  onClick?: (x: number, y: number) => void
  width: number
  height: number
}

export default function GeneralCanvas({ animate, onClick, width, height }: GeneralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new Canvas(canvasRef.current)
      canvas.start(() => {
        animate(canvas.ctx)
      })

      return () => {
        canvas.destroy()
      }
    }
  })

  function handleClick(event: React.MouseEvent<HTMLCanvasElement>) {
    if (canvasRef.current) {
      const p = canvasRef.current.getBoundingClientRect()
      onClick?.(event.clientX - p.left, event.clientY - p.top);
    }
  }

  return (
    <canvas className="z-canvas"
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
    />
  )
}

class Canvas {
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public dead: boolean

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas

    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Your browser doesn't support canvas!")
    this.ctx = ctx;

    this.dead = false
  }

  start(_draw: () => void) {
    const draw = () => {
      if (this.dead) return
      _draw()
      requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)
  }

  destroy() {
    this.dead = true
  }
}
