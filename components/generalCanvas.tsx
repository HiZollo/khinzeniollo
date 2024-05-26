"use client"

import { useEffect, useRef, useState } from "react";

interface GeneralCanvasProps {
  animate: (ctx: CanvasRenderingContext2D) => void
  onClick?: (x: number, y: number) => void
  onHover?: (x: number, y: number) => void
  onKeyDown?: (code: string) => void
  onKeyUp?: (code: string) => void
  width: number
  height: number
}

export default function GeneralCanvas({ animate, onClick, onKeyDown, onKeyUp, onHover, width, height }: GeneralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const cvs = new Canvas(canvasRef.current, onHover)
      setCanvas(cvs);
      cvs.start(() => {
        animate(cvs.ctx)
      })

      document.addEventListener("keydown", e => {
        onKeyDown?.(e.code);
      })
      document.addEventListener("keyup", e => {
        onKeyUp?.(e.code);
      })

      return () => {
        cvs.destroy()
      }
    }
  }, [animate, onHover])

  function handleClick(event: React.MouseEvent<HTMLCanvasElement>) {
    if (canvasRef.current) {
      const p = canvasRef.current.getBoundingClientRect()
      onClick?.(event.clientX - p.left, event.clientY - p.top)
    }
  }

  function handleOnEnter() {
    if (canvas) canvas.hovering = true;
  }

  function handleOnMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (canvasRef.current && canvas) {
      const p = canvasRef.current.getBoundingClientRect()
      canvas.hovering = true;
      canvas.setMouse(event.clientX - p.left, event.clientY - p.top)
    }
  }

  function handleOnLeave() {
    if (canvas) canvas.hovering = false;
  }

  return (
    <canvas className="z-canvas"
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      onMouseEnter={handleOnEnter}
      onMouseMove={handleOnMove}
      onMouseLeave={handleOnLeave}
    />
  )
}

class Canvas {
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public dead: boolean

  private mouseX: number;
  private mouseY: number;

  public hovering: boolean;
  private onHover?: (x: number, y: number) => void

  constructor(canvas: HTMLCanvasElement, onHover?: (x: number, y: number) => void) {
    this.canvas = canvas

    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Your browser doesn't support canvas!")
    this.ctx = ctx;
    this.dead = false

    this.mouseX = 0;
    this.mouseY = 0;

    this.hovering = false;
    this.onHover = onHover;
}

  start(_draw: () => void) {
    const draw = () => {
      if (this.dead) return
      _draw()
      if (this.hovering) this.onHover?.(this.mouseX, this.mouseY)
      requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)
  }

  setMouse(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
  }

  destroy() {
    this.dead = true
  }
}
