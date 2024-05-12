import Input from '@/components/TextInput'
import Button from '@/components/button'
import styles from './page.module.css'
import { createCanvas, loadImage } from 'canvas'
import Image from 'next/image'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// const originalText = `Iam illa, perfugia quae sumunt sibi ad excusationem quo facilius otio perfruantur, certe minime sunt audienda, cum ita dicunt accedere ad rem publicam plerumque homines nulla re bona dignos, cum quibus comparari sordidum, confligere autem multitudine praesertim incitata miserum et periculosum sit. quam ob rem neque sapientis esse accipere habenas cum insanos atque indomitos impetus volgi cohibere non possit, neque liberi cum inpuris atque inmanibus adversariis decertantem vel contumeliarum verbera subire, vel expectare sapienti non ferendas iniurias: proinde quasi bonis et fortibus et magno animo praeditis ulla sit ad rem publicam adeundi causa iustior, quam ne pareant inprobis, neve ab isdem lacerari rem publicam patiantur, cum ipsi auxilium ferre si cupiant non queant.
// Illa autem exceptio cui probari tandem potest, quod negant sapientem suscepturum ullam rei publicae partem, extra quam si eum tempus et necessitas coegerit? quasi vero maior cuiquam necessitas accidere possit quam accidit nobis; in qua quid facere potuissem, nisi tum consul fuissem? consul autem esse qui potui, nisi eum vitae cursum tenuissem a pueritia, per quem equestri loco natus pervenirem ad honorem amplissimum? non igitur potestas est ex tempore aut cum velis opitulandi rei publicae, quamvis ea prematur periculis, nisi eo loco sis ut tibi id facere liceat.`

const originalTexts = [
`Spiritum cano, fortem et magnum. Est a deo facti, olim olim. Quondam est gnatus, caeli terraeque divisuri ibant, et legenda inceptura ibat.
Erit inusitata vita eius. Ad idus Martii nascitur. Quando imperator magnus occiditur, alter viam eius magnam est incipiendus. Ei nomine non opus est. Zollus vocatur, incarnatus Martis putatur, a populis Ignatiae. Non est vicenarius, mundi fortissimus.
Aut non, quia Ignatia belli est. Mundus est omnis divisus in partes duo. Duo regni imperio mundi pugnant. Aurelius Nocturnus imperat Tenarium. Nemo liber est, servint regis. In exhaustis, esurientibus, et tenebris vivunt. Canant: Vivat rex. Autem Regito Lucius, qui lux populorumque est, miserabilis populos salvabit. Regit Ignatiam, serenitatem et divem. In Tenarium, dicit, tum bellum incipit.
In principio belli vincebat, sed multae acies Aurelii est. Is cogit populi sui in vim. Quando hic Lucii moritur post putans, Aurelius vincere incipit. Ille ab hoc victus paene est. "Quid facere debeo?" Lucius interrogat. Ante desistit, Deus respondet. Unum nomen venit. Nomen auditum est. Quis est?
Nomen dei. Lucius lucem videt. Nomen lapidem sculpitur. Stellae fulgent, eo fulget. Is est, certe. Eum esse oportet. Nobis inveniendus est. Rex vocat, populi vocant, adveniendo miraculo. Venti fortis per portam flant Ignatiam. Advenit.
Ab tribus millibus passo venit. Apud porta, Rex eum videt. "Salve, mee bellator. Est opus te mundo. Lucem et tenebras potes, bonum et malum dividere" rex salvet et interrogat. Respondet "malum malo aptissimum, ad inferos mittam eos." Dicit "post hoc, te dabo magna villa, pulchrae feminae, mille servi et ancilae." Zollus non laete respondet "Feminae non opus est mihi. Initium turbandi omnia a femina ortum est. Omnia cui opus est mihi loricae et equus et gladius magnus." Concedatur.`,

`Paragraphus secundus`,

`Paragraphus tertius`
]

const CANVAS_WIDTH = 600
const LINE_HEIGHT = 30
const CANVAS_WIDTH_HALF = CANVAS_WIDTH / 2

export default async function Dos() {
  const session = (await getServerSession(authOptions))!

  const index = getSectionIndex(session.user.id!)

  const text = originalTexts[index]
    .replace(/[ ,.:;"!?]/g, '')
    .replaceAll('\n', ' ')
    .toUpperCase()
    .replaceAll('U', 'V')

  const lines = text.match(/.{1,50}/g)!

  const canvas = createCanvas(CANVAS_WIDTH, lines.length * LINE_HEIGHT)
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
      <p>Esto es la última leyenda creada por la leyenda.</p>
      <p>Léela y responde las preguntas.</p>
      <Image src={canvas.toDataURL()} alt="" width={canvas.width} height={canvas.height} />
    </>
  )
}

function getSectionIndex(id: string) {
  return Number(BigInt(id) % BigInt(3))
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

