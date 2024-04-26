import { NextResponse } from "next/server";

const originalText = `Iam illa, perfugia quae sumunt sibi ad excusationem quo facilius otio perfruantur, certe minime sunt audienda, cum ita dicunt accedere ad rem publicam plerumque homines nulla re bona dignos, cum quibus comparari sordidum, confligere autem multitudine praesertim incitata miserum et periculosum sit. quam ob rem neque sapientis esse accipere habenas cum insanos atque indomitos impetus volgi cohibere non possit, neque liberi cum inpuris atque inmanibus adversariis decertantem vel contumeliarum verbera subire, vel expectare sapienti non ferendas iniurias: proinde quasi bonis et fortibus et magno animo praeditis ulla sit ad rem publicam adeundi causa iustior, quam ne pareant inprobis, neve ab isdem lacerari rem publicam patiantur, cum ipsi auxilium ferre si cupiant non queant.
Illa autem exceptio cui probari tandem potest, quod negant sapientem suscepturum ullam rei publicae partem, extra quam si eum tempus et necessitas coegerit? quasi vero maior cuiquam necessitas accidere possit quam accidit nobis; in qua quid facere potuissem, nisi tum consul fuissem? consul autem esse qui potui, nisi eum vitae cursum tenuissem a pueritia, per quem equestri loco natus pervenirem ad honorem amplissimum? non igitur potestas est ex tempore aut cum velis opitulandi rei publicae, quamvis ea prematur periculis, nisi eo loco sis ut tibi id facere liceat.`

const text = originalText
  .replaceAll(/[ ,.:;"!?]/g, '')
  .replaceAll('\n', ' ')
  .toUpperCase()
  .replaceAll('U', 'V')

export function GET(req: Request) {
  return NextResponse.json({ text: text })
}
