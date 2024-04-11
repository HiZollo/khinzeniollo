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

type Regions = ArrayElement<typeof regions>
type Provinces = ArrayElement<typeof provinces>

const SIZE = 600

const regions = [
  "Andalusia_r", "Aragon_r", "Asturias_r", "Basque Country_r", "Cantabria_r", 
  "Castile and Leon_r", "Castilla-La Mancha_r", "Catalonia_r", "Extremadura_r", 
  "Galicia_r", "La Rioja_r", "Madrid_r", "Murcia_r", "Navarre_r", "Valencia_r"
] as const

const provinces = [
  "Alava_p", "Albacete_p", "Alicante_p", "Almeria_p", "Asturias_p", "Avila_p", 
  "Badajoz_p", "Barcelona_p", "Biscay_p", "Burgos_p", "Caceres_p", 
  "Cadiz_p", "Cantabria_p", "Castellon_p", "Ciudad Real_p", "Cordoba_p", "Cuenca_p", 
  "Gerona_p", "Granada_p", "Guadalajara_p", "Gipuzcoa_p", "Huelva_p", "Huesca_p", "Jaen_p", 
  "La Coruna_p", "Leon_p", "Lerida_p", "Lugo_p", "Madrid_p", "Malaga_p", "Murcia_p", 
  "Navarre_p", "Orense_p", "Palencia_p", "Pontevedra_p", "La Rioja_p", "Salamanca_p", 
  "Segovia_p", "Seville_p", "Soria_p", "Tarragona_p", 
  "Teruel_p", "Toledo_p", "Valencia_p", "Valladolid_p", "Vizcaya_p", "Zamora_p", "Zaragoza_p"
] as const

const largeEdges: [Regions, Regions][]  = [
  ["Galicia_r", "Asturias_r"], ["Galicia_r", "Castile and Leon_r"], 
  ["Asturias_r", "Cantabria_r"], ["Asturias_r", "Castile and Leon_r"], 
  ["Cantabria_r", "Basque Country_r"], ["Cantabria_r", "Castile and Leon_r"], 
  ["Basque Country_r", "Navarre_r"], ["Basque Country_r", "Castile and Leon_r"], ["Basque Country_r", "La Rioja_r"], 
  ["Navarre_r", "La Rioja_r"], ["Navarre_r", "Aragon_r"], 
  ["Castile and Leon_r", "La Rioja_r"], ["Castile and Leon_r", "Aragon_r"], ["Castile and Leon_r", "Madrid_r"], 
  ["Castile and Leon_r", "Castilla-La Mancha_r"], ["Castile and Leon_r", "Extremadura_r"], 
  ["La Rioja_r", "Aragon_r"], 
  ["Aragon_r", "Catalonia_r"], ["Aragon_r", "Castilla-La Mancha_r"], ["Aragon_r", "Valencia_r"], 
  ["Catalonia_r", "Valencia_r"], 
  ["Madrid_r", "Castilla-La Mancha_r"], 
  ["Castilla-La Mancha_r", "Extremadura_r"], ["Castilla-La Mancha_r", "Valencia_r"], 
  ["Castilla-La Mancha_r", "Andalusia_r"], ["Castilla-La Mancha_r", "Murcia_r"], 
  ["Valencia_r", "Murcia_r"], 
  ["Extremadura_r", "Andalusia_r"], 
  ["Andalusia_r", "Murcia_r"]
]

const smallEgdes: Record<Regions, [Provinces, Provinces | Regions][]> = {
  "Andalusia_r": [
    ["Huelva_p", "Seville_p"], ["Huelva_p", "Cadiz_p"], ["Seville_p", "Cordoba_p"], 
    ["Seville_p", "Cadiz_p"], ["Seville_p", "Malaga_p"], ["Cordoba_p", "Jaen_p"], 
    ["Cordoba_p", "Malaga_p"], ["Cordoba_p", "Granada_p"], ["Jaen_p", "Granada_p"], 
    ["Cadiz_p", "Malaga_p"], ["Malaga_p", "Granada_p"], ["Granada_p", 'Almeria_p'], 

    ["Huelva_p", "Extremadura_r"], ["Seville_p", "Extremadura_r"], 
    ["Cordoba_p", "Extremadura_r"], ["Cordoba_p", "Castilla-La Mancha_r"], 
    ["Jaen_p", "Castilla-La Mancha_r"], ["Granada_p", "Castilla-La Mancha_r"], 
    ["Almeria_p", "Murcia_r"]
  ], 
  "Aragon_r": [
    ["Huesca_p", "Zaragoza_p"], ["Zaragoza_p", "Teruel_p"], 

    ["Huesca_p", "Navarre_r"], ["Huesca_p", "Catalonia_r"], 
    ["Zaragoza_p", "Navarre_r"], ["Zaragoza_p", "La Rioja_r"], 
    ["Zaragoza_p", "Castile and Leon_r"], ["Zaragoza_p", "Castilla-La Mancha_r"], 
    ["Zaragoza_p", "Catalonia_r"], ["Teruel_p", "Catalonia_r"], 
    ["Teruel_p", "Castilla-La Mancha_r"], ["Teruel_p", "Valencia_r"]
  ], 
  "Asturias_r": [
    ["Asturias_p", "Galicia_r"], ["Asturias_p", "Cantabria_r"], 
    ["Asturias_p", "Castile and Leon_r"], 
  ], 
  "Basque Country_r": [
    ["Vizcaya_p", "Gipuzcoa_p"], ["Vizcaya_p", "Alava_p"], 
    ["Gipuzcoa_p", "Alava_p"], 

    ["Vizcaya_p", "Cantabria_r"], ["Vizcaya_p", "Castile and Leon_r"], 
    ["Gipuzcoa_p", "Navarre_r"], ["Alava_p", "Navarre_r"], 
    ["Alava_p", "Castile and Leon_r"], ["Alava_p", "La Rioja_r"]
  ], 
  "Cantabria_r": [
    ["Cantabria_p", "Asturias_r"], ["Cantabria_p", "Basque Country_r"], 
    ["Cantabria_p", "Castile and Leon_r"], 
  ], 
  "Castile and Leon_r": [
    ["Leon_p", "Palencia_p"], ["Leon_p", "Zamora_p"], ["Leon_p", "Valladolid_p"], 
    ["Palencia_p", "Burgos_p"], ["Palencia_p", "Valladolid_p"], 
    ["Burgos_p", "Valladolid_p"], ["Burgos_p", "Segovia_p"], ["Burgos_p", "Soria_p"], 
    ["Zamora_p", "Valladolid_p"], ["Zamora_p", "Salamanca_p"], 
    ["Valladolid_p", "Segovia_p"], ["Valladolid_p", "Salamanca_p"], 
    ["Valladolid_p", "Avila_p"], ["Segovia_p", "Soria_p"], ["Salamanca_p", "Avila_p"], 

    ["Leon_p", "Galicia_r"], ["Leon_p", "Asturias_r"], ["Leon_p", "Cantabria_r"], 
    ["Palencia_p", "Cantabria_r"], ["Burgos_p", "Cantabria_r"], 
    ["Burgos_p", "Basque Country_r"], ["Burgos_p", "La Rioja_r"], 
    ["Zamora_p", "Galicia_r"], ["Segovia_p", "Madrid_r"], 
    ["Segovia_p", "Castilla-La Mancha_r"], ["Soria_p", "La Rioja_r"], 
    ["Soria_p", "Aragon_r"], ["Soria_p", "Castilla-La Mancha_r"], 
    ["Salamanca_p", "Extremadura_r"], ["Avila_p", "Madrid_r"], 
    ["Avila_p", "Extremadura_r"], ["Avila_p", "Castilla-La Mancha_r"]
  ], 
  "Castilla-La Mancha_r": [
    ["Guadalajara_p", "Cuenca_p"], ["Toledo_p", "Cuenca_p"], 
    ["Toledo_p", "Ciudad Real_p"], ["Cuenca_p", "Ciudad Real_p"], 
    ["Cuenca_p", "Albacete_p"], ["Ciudad Real_p", "Albacete_p"], 

    ["Guadalajara_p", "Castile and Leon_r"], ["Guadalajara_p", "Madrid_r"], 
    ["Guadalajara_p", "Aragon_r"], ["Toledo_p", "Madrid_r"], 
    ["Toledo_p", "Extremadura_r"], ["Cuenca_p", "Aragon_r"], 
    ["Cuenca_p", "Valencia_r"], ["Ciudad Real_p", "Extremadura_r"], 
    ["Ciudad Real_p", "Andalusia_r"], ["Albacete_p", "Valencia_r"], 
    ["Albacete_p", "Andalusia_r"], ["Albacete_p", "Murcia_r"]
  ], 
  "Catalonia_r": [
    ["Lerida_p", "Gerona_p"], ["Lerida_p", "Tarragona_p"], 
    ["Lerida_p", "Barcelona_p"], ["Gerona_p", "Barcelona_p"], 
    ["Tarragona_p", "Barcelona_p"], 

    ["Lerida_p", "Aragon_r"], ["Tarragona_p", "Aragon_r"], 
    ["Tarragona_p", "Valencia_r"]
  ], 
  "Extremadura_r": [
    ["Caceres_p", "Badajoz_p"], 

    ["Caceres_p", "Castile and Leon_r"], ["Caceres_p", "Castilla-La Mancha_r"], 
    ["Badajoz_p", "Castilla-La Mancha_r"], ["Badajoz_p", "Andalusia_r"]
  ], 
  "Galicia_r": [
    ["La Coruna_p", "Lugo_p"], ["La Coruna_p", "Pontevedra_p"], 
    ["Lugo_p", "Pontevedra_p"], ["Lugo_p", "Orense_p"], 
    ["Pontevedra_p", "Orense_p"], 

    ["Lugo_p", "Asturias_r"], ["Lugo_p", "Castile and Leon_r"], 
    ["Orense_p", "Castile and Leon_r"]
  ], 
  "La Rioja_r": [
    ["La Rioja_p", "Basque Country_r"], ["La Rioja_p", "Navarre_r"], 
    ["La Rioja_p", "Castile and Leon_r"], ["La Rioja_p", "Aragon_r"], 
  ], 
  "Madrid_r": [
    ["Madrid_p", "Castile and Leon_r"], ["Madrid_p", "Castilla-La Mancha_r"]
  ], 
  "Murcia_r": [
    ["Murcia_p", "Castilla-La Mancha_r"], ["Murcia_p", "Valencia_r"], 
    ["Murcia_p", "Andalusia_r"]
  ], 
  "Navarre_r": [
    ["Navarre_p", "Basque Country_r"], ["Navarre_p", "La Rioja_r"], 
    ["Navarre_p", "Aragon_r"], 
  ], 
  "Valencia_r": [
    ["Castellon_p", "Valencia_p"], ["Valencia_p", "Alicante_p"], 

    ["Castellon_p", "Catalonia_r"], ["Castellon_p", "Aragon_r"], 
    ["Valencia_p", "Aragon_r"], ["Valencia_p", "Castilla-La Mancha_r"], 
    ["Alicante_p", "Castilla-La Mancha_r"], ["Alicante_p", "Murcia_r"]
  ]
}

const points: Record<Regions | Provinces, Point> = Object.fromEntries(
  Array.from({ length: regions.length }, (_, i) => ([
    regions[i], {
      x: random(0, SIZE), y: random(0, SIZE), vx: 0, vy: 0
    }
  ]))
) as Record<Regions | Provinces, Point>

let edges: [Regions | Provinces, Regions | Provinces][] = JSON.parse(JSON.stringify(largeEdges));

function animate(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, SIZE, SIZE)

  // draw points
  Object.entries(points).forEach(([k, p]) => {
    ctx.fillStyle = isRegion(k) ? "rgb(255 0 0)" : "rgb(0 255 0)";
    ctx.beginPath()
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, false)
    ctx.fill()
  })

  // draw edges
  ctx.strokeStyle = "rgb(255 0 0)"
  ctx.lineWidth = 2
  edges.forEach(([a, b]) => {
    if (!points[b]) {
      console.log(a, b)
    }
    ctx.beginPath()
    ctx.moveTo(points[a].x, points[a].y)
    ctx.lineTo(points[b].x, points[b].y)
    ctx.stroke()
  })

  physic()
}

let prevRegion: Regions | undefined;
function onClick(x: number, y: number) {
  let target: [number, Regions, Point] | undefined
  Object.entries(points).forEach(([label, point]) => {
    const distance = (x - point.x) ** 2 + (y - point.y) ** 2
    if (distance <= 300 && (!target || distance <= target[0]) && isRegion(label)) {
      target = [distance, label as Regions, point]
    }
  })

  if (!target) return

  const [_, region, point] = target
  if (prevRegion === region) return

  // remove previous province point
  const kinematics: Point[] = []
  for (const key in points) {
    if (isProvince(key)) {
      kinematics.push(points[key])
      console.log("removed point", key)
      delete points[key]
    }
  }

  // remove previous province edge
  edges = edges.filter(([p1, p2]) => {
    if (!(isRegion(p1) && isRegion(p2)))
      console.log("removed edges", [p1, p2])
    return isRegion(p1) && isRegion(p2)
  })

  // add previous region point
  if (prevRegion) {
    const l = kinematics.length;
    points[prevRegion] = {
      x: kinematics.reduce((acc, {x}) => acc + x, 0) / l, 
      y: kinematics.reduce((acc, {y}) => acc + y, 0) / l, 
      vx: kinematics.reduce((acc, {vx}) => acc + vx, 0) / l, 
      vy: kinematics.reduce((acc, {vy}) => acc + vy, 0) / l
    }
    console.log("add point", prevRegion)
  }

  // add previous region edge
  if (prevRegion) {
    edges.push(...largeEdges.filter(e => e.includes(prevRegion!)))
    console.log("add edges", largeEdges.filter(e => e.includes(prevRegion!)))
  }

  // remove new region point
  delete points[region]
  console.log("remove point", region)

  // remove new region edge
  edges = edges.filter(([p1, p2]) => {
    if (!(isRegion(p1) && isRegion(p2)))
      console.log("removed edges", [p1, p2])
    return p1 !== region && p2 !== region
  })

  // add new province edge
  const related = smallEgdes[region]
  const newPoints: Set<Regions | Provinces> = new Set()
  related.forEach((edge) => {
    newPoints.add(edge[0])
    newPoints.add(edge[1])
    console.log("add edge", edge)
    edges.push(edge)
  })

  // add new province point
  newPoints.forEach(p => {
    console.log("add point", p)
    points[p] = {
      x: point.x + Math.random(), y: point.y + Math.random(), 
      vx: point.vx + Math.random(), vy: point.vy + Math.random()
    }
  })

  prevRegion = region
  console.log("=====")
}

function physic() {
  const entries = Object.entries(points);

  // move
  entries.forEach(([_, p]) => {
    p.x += p.vx
    p.y += p.vy
    if (!(0 <= p.x && p.x <= SIZE)) {
      p.x = Math.min(Math.max(p.x, 0), SIZE)
      p.vx = 0
    }
    if (!(0 <= p.y && p.y <= SIZE)) {
      p.y = Math.min(Math.max(p.y, 0), SIZE)
      p.vy = 0
    }
  })

  // electronic force
  entries.forEach(([k1, p1]) => {
    entries.forEach(([k2, p2]) => {
      if (k1 === k2) return

      let dx = p2.x - p1.x
      let dy = p2.y - p1.y
      const len = Math.sqrt(dx*dx + dy*dy)
      if (len > 0) {
        const factor = 0.1 / (len * len)
        dx *= factor
        dy *= factor
        p1.vx += dx
        p1.vy += dy
        p2.vx -= dx
        p2.vy -= dy
      }
    })
  })

  // regions.forEach(c => {
  //   points[c].vx *= 0.9
  //   points[c].vy *= 0.9
  // })
}

function random(a: number, b: number) {
  return Math.random() * (b - a) + a
}

function isRegion(str: string): str is Regions {
  return str.endsWith("_r");
}

function isProvince(str: string): str is Provinces {
  return str.endsWith("_p");
}