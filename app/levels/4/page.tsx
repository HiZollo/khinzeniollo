"use client"

import GeneralCanvas from "@/components/generalCanvas";

export default function Cuatro() {
  return (
    <GeneralCanvas
      animate={animate}
      onClick={onClick}
      width={SIZE}
      height={SIZE}
    ></GeneralCanvas>
  )
}

type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

type EuropeCountries = ArrayElement<typeof europe>

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
  ["country_be", "country_nl"], ["country_nl", "country_gm"], ["country_be", "country_gm"], ["country_be", "country_lx"], 
  ["country_lx", "country_gm"], ["country_gm", "country_dm"], ["country_gm", "country_pl"], 
  ["country_gm", "country_cz"], ["country_gm", "country_at"], ["country_gm", "country_sz"], 
  ["country_sz", "country_le"], ["country_sz", "country_it"], ["country_sz", "country_at"], 
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

const points: Record<EuropeCountries, Point> = Object.fromEntries(
  Array.from({ length: europe.length }, (_, i) => ([
    europe[i], {
      x: random(0, SIZE), y: random(0, SIZE), vx: 0, vy: 0
    }
  ]))
) as Record<EuropeCountries, Point>

function animate(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, SIZE, SIZE)

  ctx.fillStyle = "rgb(255 0 0)"
  Object.values(points).forEach(p => {
    p.x += p.vx
    p.y += p.vy
    ctx.beginPath()
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, false)
    ctx.fill()

    if (!(0 <= p.x && p.x <= SIZE)) {
      p.x = Math.min(Math.max(p.x, 0), SIZE)
      p.vx = 0
    }
    if (!(0 <= p.y && p.y <= SIZE)) {
      p.y = Math.min(Math.max(p.y, 0), SIZE)
      p.vy = 0
    }
  })

  ctx.strokeStyle = "rgb(255 0 0)"
  ctx.lineWidth = 2
  edges.forEach(([a, b]) => {
    ctx.beginPath()
    ctx.moveTo(points[a].x, points[a].y)
    ctx.lineTo(points[b].x, points[b].y)
    ctx.stroke()

    let dx = points[b].x - points[a].x
    let dy = points[b].y - points[a].y
    const len = Math.max(Math.sqrt(dx*dx + dy*dy), 1)
    if (len > 0) {
      dx *= 0.00001 * (len - SIZE / 8) / len
      dy *= 0.00001 * (len - SIZE / 8) / len
      points[a].vx += dx
      points[a].vy += dy
      points[b].vx -= dx
      points[b].vy -= dy
    }
  })

  europe.forEach(c => {
    const neighbor: EuropeCountries[] = []
    edges.forEach(([a, b]) => {
      if (a == c) {
        neighbor.push(b)
      }
      if (b == c) {
        neighbor.push(a)
      }
    })

    neighbor.forEach(n1 => {
      neighbor.forEach(n2 => {
        if (n1 != n2) {
          let dx = points[n2].x - points[n1].x
          let dy = points[n2].y - points[n1].y
          const len = Math.max(Math.sqrt(dx*dx + dy*dy), 1)
          if (len > 0) {
            dx *= 1 / (len ** 3)
            dy *= 1 / (len ** 3)
            points[n1].vx -= dx
            points[n1].vy -= dy
            points[n2].vx += dx
            points[n2].vy += dy
          }
        } 
      })
    })
  })

  // europe.forEach(c => {
  //   points[c].vx *= 0.9999
  //   points[c].vy *= 0.9999
  // })
}

function onClick(x: number, y: number) {

}

function random(a: number, b: number) {
  return Math.random() * (b - a) + a
}