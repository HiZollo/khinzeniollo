"use client"

import { useEffect, useRef } from "react";

const SIZE = 600

const europe = [
  "country_pt", "country_es", "country_fr", "country_mc", "country_be", "country_lx", "country_nl", 
  "country_dm", "country_gm", "country_sz", "country_le", "country_it", "country_sm", "country_sv", 
  "country_at", "country_cz", "country_pl", "country_lt", "country_lv", "country_et", "country_fi", 
  "country_sw", "country_no", "country_bl", "country_ru", "country_sk", "country_ur", "country_hu", 
  "country_ro", "country_md", "country_bg", "country_cr", "country_bh", "country_mn", "country_sb", 
  "country_al", "country_nm", "country_gr", "country_tu"
] as const

const edges: [EuropeCountries, EuropeCountries][]  = [
  ["country_pt", "country_es"], ["country_es", "country_fr"], ["country_es", "country_mc"], 
  ["country_fr", "country_be"], ["country_fr", "country_lx"], ["country_fr", "country_mc"], 
  ["country_fr", "country_gm"], ["country_fr", "country_sz"], ["country_fr", "country_it"], 
  ["country_be", "country_nl"], ["country_be", "country_gm"], ["country_be", "country_lx"], 
  ["country_lx", "country_gm"], ["country_gm", "country_dm"], ["country_gm", "country_pl"], 
  ["country_gm", "country_cz"], ["country_gm", "country_at"], ["country_gm", "country_sz"], 
  ["country_sz", "country_le"], ["country_sz", "country_le"], ["country_sz", "country_at"], 
  ["country_le", "country_at"], ["country_it", "country_at"], ["country_it", "country_sv"], 
  ["country_it", "country_sm"], ["country_sv", "country_at"], ["country_sv", "country_hu"], 
  ["country_sv", "country_cr"], ["country_at", "country_cz"], ["country_at", "country_sk"], 
  ["country_at", "country_hu"], ["country_cz", "country_pl"], ["country_cz", "country_sk"], 
  ["country_pl", "country_lt"], ["country_pl", "country_ru"], ["country_pl", "country_bl"], 
  ["country_pl", "country_ur"], ["country_pl", "country_sk"], ["country_lt", "country_lv"], 
  ["country_lt", "country_ru"], ["country_lt", "country_bl"], ["country_lv", "country_et"], 
  ["country_lv", "country_ru"], ["country_lv", "country_bl"], ["country_et", "country_ru"], 
  ["country_ru", "country_fi"], ["country_ru", "country_no"], ["country_ru", "country_ur"], 
  ["country_ru", "country_bl"], ["country_fi", "country_no"], ["country_no", "country_sw"], 
  ["country_sw", "country_fi"], ["country_bl", "country_ur"], ["country_sk", "country_hu"], 
  ["country_sk", "country_ur"], ["country_ur", "country_hu"], ["country_ur", "country_ro"], 
  ["country_ur", "country_md"], ["country_hu", "country_ro"], ["country_hu", "country_sb"], 
  ["country_hu", "country_cr"], ["country_cr", "country_mn"], ["country_cr", "country_bh"], 
  ["country_cr", "country_sb"], ["country_ro", "country_md"], ["country_ro", "country_bg"], 
  ["country_ro", "country_sb"], ["country_sb", "country_bg"], ["country_sb", "country_nm"], 
  ["country_sb", "country_al"], ["country_sb", "country_mn"], ["country_sb", "country_bh"], 
  ["country_mn", "country_bh"], ["country_mn", "country_al"], ["country_bg", "country_nm"], 
  ["country_bg", "country_gr"], ["country_bg", "country_tu"], ["country_nm", "country_al"], 
  ["country_nm", "country_gr"], ["country_gr", "country_al"], ["country_gr", "country_tu"], 
]

type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type EuropeCountries = ArrayElement<typeof europe>

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

const points: Record<EuropeCountries, Point> = Object.fromEntries(
  Array.from({ length: europe.length }, (_, i) => ([
    europe[i], {
      x: random(0, SIZE), y: random(0, SIZE), vx: 0, vy: 0
    }
  ]))
) as Record<EuropeCountries, Point>

export default function GeneralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new Canvas(canvasRef.current)
      canvas.start(() => {
        canvas.ctx.clearRect(0, 0, SIZE, SIZE)

        canvas.ctx.fillStyle = "rgb(200 0 0)"
        Object.values(points).forEach(p => {
          p.x += p.vx
          p.y += p.vy
          canvas.ctx.beginPath()
          canvas.ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, false)
          canvas.ctx.fill()

          if (!(0 <= p.x && p.x <= SIZE)) {
            p.x = Math.min(Math.max(p.x, 0), SIZE)
            p.vx = -p.vx
          }
          if (!(0 <= p.y && p.y <= SIZE)) {
            p.y = Math.min(Math.max(p.y, 0), SIZE)
            p.vy = -p.vy
          }
        })

        canvas.ctx.strokeStyle = "rgb(200 0 0)"
        canvas.ctx.lineWidth = 2
        edges.forEach(([a, b]) => {
          canvas.ctx.beginPath()
          canvas.ctx.moveTo(points[a].x, points[a].y)
          canvas.ctx.lineTo(points[b].x, points[b].y)
          canvas.ctx.stroke()

          let dx = points[b].x - points[a].x
          let dy = points[b].y - points[a].y
          const len = Math.sqrt(dx*dx + dy*dy)
          dx /= len * 100 * (len > (SIZE / 2) ? 1 : -1)
          dy /= len * 100 * (len > (SIZE / 2) ? 1 : -1)
          points[a].vx += dx
          points[a].vy += dy
          points[b].vx -= dx
          points[b].vy -= dy
        })
      })
    }
  })

  return (
    <canvas className="z-canvas"
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
    />
  )
}

class Canvas {
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D


  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas

    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Your browser doesn't support canvas!")
    this.ctx = ctx;
  }

  start(_draw: () => void) {
    const draw = () => {
      _draw()
      requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)
  }
}

function random(a: number, b: number) {
  return Math.random() * (b - a) + a
}