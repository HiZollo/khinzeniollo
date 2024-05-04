import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Input from '@/components/TextInput'
import Button from '@/components/button'
import styles from './page.module.css'
import { createCanvas, loadImage } from 'canvas'
import Image from 'next/image'

const originalText = `Iam illa, perfugia quae sumunt sibi ad excusationem quo facilius otio perfruantur, certe minime sunt audienda, cum ita dicunt accedere ad rem publicam plerumque homines nulla re bona dignos, cum quibus comparari sordidum, confligere autem multitudine praesertim incitata miserum et periculosum sit. quam ob rem neque sapientis esse accipere habenas cum insanos atque indomitos impetus volgi cohibere non possit, neque liberi cum inpuris atque inmanibus adversariis decertantem vel contumeliarum verbera subire, vel expectare sapienti non ferendas iniurias: proinde quasi bonis et fortibus et magno animo praeditis ulla sit ad rem publicam adeundi causa iustior, quam ne pareant inprobis, neve ab isdem lacerari rem publicam patiantur, cum ipsi auxilium ferre si cupiant non queant.
Illa autem exceptio cui probari tandem potest, quod negant sapientem suscepturum ullam rei publicae partem, extra quam si eum tempus et necessitas coegerit? quasi vero maior cuiquam necessitas accidere possit quam accidit nobis; in qua quid facere potuissem, nisi tum consul fuissem? consul autem esse qui potui, nisi eum vitae cursum tenuissem a pueritia, per quem equestri loco natus pervenirem ad honorem amplissimum? non igitur potestas est ex tempore aut cum velis opitulandi rei publicae, quamvis ea prematur periculis, nisi eo loco sis ut tibi id facere liceat.`

const CANVAS_WIDTH = 600
const LINE_HEIGHT = 35
const CANVAS_WIDTH_HALF = CANVAS_WIDTH / 2

export default async function Dos() {
  const text = originalText
    .replaceAll(/[ ,.:;"!?]/g, '')
    .replaceAll('\n', ' ')
    .toUpperCase()
    .replaceAll('U', 'V')

  const lines = text.match(/.{1,50}/g)!

  const canvas = createCanvas(CANVAS_WIDTH, lines.length * 35)
  const ctx = canvas.getContext('2d')
  ctx.save()

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const slate = await loadImage('./public/slate_background_2.png')
  const background = ctx.createPattern(slate, 'repeat')
  ctx.fillStyle = background
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // @ts-ignore
  ctx.setTransform(1, 0, 0, 1, CANVAS_WIDTH_HALF, LINE_HEIGHT);

  ctx.font = 'bold 20px monospace'
  ctx.fillStyle = '#211118'

  lines.forEach((line, i) => {
    Array.prototype.forEach.call(line, (text, j) => {
      const r = Math.random() * Math.PI / 180
      ctx.rotate(r)
      ctx.fillText(text, -CANVAS_WIDTH_HALF + j*12 + 4*Math.random()-2, 4*Math.random()-2)
      ctx.rotate(-r)
    })

    // ctx.fillText(line, -CANVAS_WIDTH_HALF, 0)
    ctx.scale(-1,1)
    ctx.translate(0, LINE_HEIGHT)
  })


  ctx.translate(-300, -canvas.height-35)
  const crack = await loadImage('./public/crack.png')
  const crack_effect = ctx.createPattern(crack, 'repeat')
  ctx.fillStyle = crack_effect
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  return (
    <>
      <h1>Rosetta</h1>
      <Image src={canvas.toDataURL()} alt="" width={canvas.width} height={canvas.height} />
    </>
  )
}

async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-384", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

