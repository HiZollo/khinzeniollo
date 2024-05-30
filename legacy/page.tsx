import Input from '@/components/TextInput'
import Button from '@/components/button'
import styles from './page.module.css'
import { createCanvas, loadImage } from 'canvas'
import Image from 'next/image'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import fs from 'node:fs'


const originalTexts = [
`Spiritum cano, fortem et magnum. Est a deo facti, olim olim. Quondam est gnatus, caeli terraeque divisuri ibant, et legenda inceptura ibat.
Erit inusitata vita eius. Ad idus Martiae nascitur. Quando imperator magnus occiditur, alter viam eius magnam est incipiendus. Ei nomine non opus est. Zollus vocatur, incarnatus Martis putatur, a populis Ignatiae. Non est vicenarius, mundi fortissimus.
Aut non, quia Ignatia belli est. Mundus est omnis divisus in partes duo. Duo regni imperio mundi pugnant. Aurelius Nocturnus imperat Tenarium. Nemo liber est, servint regis. In exhaustis, esurientibus, et tenebris vivunt. Canant: Vivat rex. Autem Regito Lucius, qui lux populorumque est, miserabilis populos salvabit. Regit Ignatiam, serenitatem et divem. In Tenarium, dicit, tum bellum incipit.
In principio belli vincebat, sed multae acies Aurelii est. Is cogit populi sui in vim. Quando hic Lucii moritur post putans, Aurelius vincere incipit. Ille ab hoc victus paene est. "Quid facere debeo?" Lucius interrogat. Ante desistit, Deus respondet. Unum nomen venit. Nomen auditum est. Quis est?
Nomen dei. Lucius lucem videt. Nomen lapidem sculpitur. Stellae fulgent, eo fulget. Is est, certe. Eum esse oportet. Nobis inveniendus est. Rex vocat, populi vocant, adveniendo miraculo. Venti fortis per portam flant Ignatiam. Advenit.
Ab tribus millibus passo venit. Apud porta, Rex eum videt. "Salve, mee bellator. Est opus te mundo. Lucem et tenebras potes, bonum et malum dividere" rex salvet et interrogat. Respondet "malum malo aptissimum, ad inferos mittam eos." Dicit "post hoc, te dabo magna villa, pulchrae feminae, mille servi et ancilae." Zollus non laete respondet "Feminae non opus est mihi. Initium turbandi omnia a femina ortum est. Omnia cui opus est mihi loricae et equus et gladius magnus." Concedatur.`,

`Zollus loricam segmentatam suam induit, gladium affert, in equo ad Tenarium it. Per portam, ad oppidum Tenarii. Caeruleum luna lucet mare profundum. Primus inimicus apparet. Dominus oppidi Avanii, Titus pugionem suum teneo. Videt Zollum oculos acutos. "Indifferenter quisquis es, te interficiam," Dicit. Eum ignoravit et Zollus pugnam incipit. Non multum tempus, caput Titi deponitur. "Stultus." Zollus decit et ponit. Ad caput Tenarii it.
Exercitus populi advenit contra Zollum pugnaturum esse. "Melior tibi exire, quisquis es." Ipse exercitus secundarius non potest Zollum vincere. Solus vir unus, multam habet utilitatem iam. "Cede, populi mei. No servite Satanan. Lucius vos educet ex tenebris", dicit ad remanentes homines. Quasi ordo est, Nemo resistit. Aemilia exit ab populo. Puella est et imperator exercitus. Zollum videt et interrogat, "Quomodo nos meliorem facis?" "Non facio," dicit, "sed facit Lucius. Vivite Lucis, discedite tenebras. Meliores eritis." "Aut non. Cur is nos melior facit? Omnes voluntarii sumus servere Aurelium." Aemilia Zollum interrogat. Is non respondet. Videt eos doloribus.
"Si no me credas, discede." Zollus in equo suo dicit et discedet. "Cessa!" puella vocat. Zollus eam audit et cessat. "Si es, credere possum." "Quid?" Zollus dicit. Interrogat. "Quia tuum nomine scio, Caesar." Zollus congelat et Aemilia continuat. "Caesar Augustus Zollus tuum nomine est." "Quid ergo?" Contemptim dicit Zollus. "Demonstra mihi tuas credentias. Volo videre." Aemilia dicit. In equo eae est.`,

`"Modo ne me vexes." Zollus ad caput Tenarii it. Ea eum sequitur. Ii ex villa, per agros et silvas. Aliqui rebelles in silva apparent, sed ille omnes vincit. Marcus in silva est, paratus Zollum necare. Cum ille viam transeat, hic celeriter egreditur et pugione parato in Zollum inruit. Nescit autem Zollum eum iam post arborem latentem vidisse. Cum emergit, laqueus eum capit et clamare dolore cogitur. "Desine ineptire. Potestas tibi est melius vivere, si Lucium sequaris," inquit Zollus. Sed ille vir obstinate resistebat. Cum alterum pugionem evellisset, Aemilia eum interfecit. Zollus nihil dixit, sed iter suum continuavit. Ea eum sequitur. Zollus ad caput Tenarii it.
"Quid est via ad caput?" interrogat. "Via Almeria illic est." respondet. "Capitis nomen Almeria est." Ea explicat eum. Zollus ibi caute ambulat et parvam viam videt. Equum ascendit et celeriter per viam currit. Sequitur Aemilia ad viam in tenebras, regnum Satanae. Via latior fit dum Almeriae appropinquant. Trans flumen gradientes, magnum castrum ante eos apparet. Tandem Almeriam advenerunt. Per portam intrantes, Aurelius eos ibi exspectat.
"Es." Dicit. "Stulta puella te huc adducitne?" inquit. "Haec est ultima occasio, peccata tua Deo confiteri potes et lumen aspicere." Zollus dicit. "Cur credis te lumina esse? Fortasse re vera tenebrae estis, nonne?" Aurelius eis ridet. "Tum te delendus sum." Zollus gradum prodit. Aurelius serium fit. "Haec est ultima admonitio. Si lineam transis, non placebit quid accidat." Haec comminatio nullius momenti est, Zollus pergere non desinit. "Interessant." Aurelius dicit. "Fortasse ludus incipendus sumus."`,

`Aurelius gladium suum sumit, ambulat ad Zollum. Ultimum proelium coepit. Nulla misericordia est. Odis omnibus et amoribus. Pluvia est ploratus caeli. Tonitrus illuminat spiritus eorum. Animae concurrerunt, et gladii scintillaverunt. Aurelius bracchium eius percussit, sanguinem primum belli sancti accipit. Zollus retrocedit et stare non potest. Aurelius occasionem nactus progreditur. Gladium levat et in eum vibrat. Aemilia intervenit et ictum arcet. Tempus quasi congelatur, lacrimae rubrae in pulverem decidunt, et vestimenta eius sanguine imbuta sunt. Facies pallida, ad Aurelium spectans, "Fortasse errat," inquit, "sed ei magis quam tibi credo." Deinde procumbit.
Aurelius momento congelatur, et hoc Zollum magnam occasionem dat. Proximo impetu elusit et incedens gladium suum sustulit. Aurelius hoc non exspectat, conat defendere. Sed iam sero est. Ultime, gladius Zolli pectum penetrat. Corem eius destruit, sanguis effunditur. Non est iratus, non tristis. Vicisti, Zolle, sed non omnia; etiam mors victorem est. Dicit, ridet, concidit.
Post Aurelii mortem inspiciens, Zollus ad Aemiliam ambulat, quae in terra prostrata dolore maeret. Pulvis ruber circumstat. "Ave imperator, moritura te salutat." Inquit. "Imperator non me est, moritura non te est." respondet. Zollus conatur eam servare, sed vulnus nimis grande est. Aemilia brevi post moritur. Animus eius paulatim discedit, et nubes paulatim dissipantur, recludentes post se lunam. "Diana." Inquit Zollus, et discedet Almeriam.
Tum ad Ignatiam revertitur. Lucius eum excipit. "Optime egisti. Gentes de tenebris ad lucem adduxisti. Tibi terram magnam offeram et titulum gloriosum." At Zollus omnia munera repudiat et urbem relinquit. Legenda narrat eum ad Almeriam redisse, sed nemo certum scit.`
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

  const slate = await loadImage(process.cwd() + '/public/slate_background_2.png')
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
  const crack = await loadImage(process.cwd() + '/public/crack.png')
  const crack_effect = ctx.createPattern(crack, 'repeat')
  ctx.fillStyle = crack_effect
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  return (
    <>
      <h1>Rosetta</h1>
      <p>Las losas desenterrada en el este de España.</p>
      <p>Esto es la última leyenda creada por la leyenda.</p>
      <p>Léela y responde las preguntas.</p>
      <Image src={canvas.toDataURL()} alt="" width={canvas.width} height={canvas.height} />
    </>
  )
}

function getSectionIndex(id: string) {
  return Number(BigInt(id) % BigInt(4))
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

