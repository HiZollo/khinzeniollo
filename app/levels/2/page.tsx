import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Input from '@/components/TextInput'
import Button from '@/components/button'
import styles from './page.module.css'
import { createCanvas, loadImage } from 'canvas'

const originalText = `Iam illa, perfugia quae sumunt sibi ad excusationem quo facilius otio perfruantur, certe minime sunt audienda, cum ita dicunt accedere ad rem publicam plerumque homines nulla re bona dignos, cum quibus comparari sordidum, confligere autem multitudine praesertim incitata miserum et periculosum sit. quam ob rem neque sapientis esse accipere habenas cum insanos atque indomitos impetus volgi cohibere non possit, neque liberi cum inpuris atque inmanibus adversariis decertantem vel contumeliarum verbera subire, vel expectare sapienti non ferendas iniurias: proinde quasi bonis et fortibus et magno animo praeditis ulla sit ad rem publicam adeundi causa iustior, quam ne pareant inprobis, neve ab isdem lacerari rem publicam patiantur, cum ipsi auxilium ferre si cupiant non queant.
Illa autem exceptio cui probari tandem potest, quod negant sapientem suscepturum ullam rei publicae partem, extra quam si eum tempus et necessitas coegerit? quasi vero maior cuiquam necessitas accidere possit quam accidit nobis; in qua quid facere potuissem, nisi tum consul fuissem? consul autem esse qui potui, nisi eum vitae cursum tenuissem a pueritia, per quem equestri loco natus pervenirem ad honorem amplissimum? non igitur potestas est ex tempore aut cum velis opitulandi rei publicae, quamvis ea prematur periculis, nisi eo loco sis ut tibi id facere liceat.`

export default async function Dos() {
  const text = originalText
    .replaceAll(/[ ,.:;"!?]/g, '')
    .replaceAll('\n', ' ')
    .toUpperCase()
    .replaceAll('U', 'V')

  const lines = text.match(/.{1,50}/g)!

  const canvas = createCanvas(600, lines.length * 35)
  const ctx = canvas.getContext('2d')

  // @ts-ignore
  ctx.setTransform(1, 0, 0, 1, 300, 35);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.font = '20px monospace'
  ctx.fillStyle = '#ffffff'

  lines.forEach((line, i) => {
    Array.prototype.forEach.call(line, (text, j) => {
      const r = Math.random() * Math.PI / 360
      ctx.rotate(r)
      ctx.fillText(text, j*12 + 2*(2 * Math.random() - 1) - 300, 2*(2 * Math.random() - 1))
      ctx.rotate(-r)
    })

    // ctx.fillText(line, 0, (i+1)*35)
    ctx.scale(-1,1)
    ctx.translate(0, 35)
  })

  return (
    <>
      <h1>Rosetta</h1>
      <img src={canvas.toDataURL()} />
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

