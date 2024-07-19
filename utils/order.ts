import { insertOrderSchema, type Keycap, type Switch } from "@/server/db/schema"
import type { KeyboardsJoinedColorsRow } from "@/server/utils/translate"

export type CustomerOrder = {
  keyboardColor: KeyboardsJoinedColorsRow | null,
  switches: Switch | null,
  keycaps: Keycap | null,
  handlubedSwitches: boolean,
  extraFoam: boolean,
  tapeMod: boolean,
  name: string | null,
  phoneNumber: string | null,
  address: string | null,
  note: string | null,
}

export type ModKey = "handlubedSwitches" | "extraFoam" | "tapeMod" | "stabilisers"

export type Mod = {
  title: string,
  desc: string,
  price: number,
  required: boolean,
  key: ModKey,
} 

export type KeyboardBuild = {
  keyboard: KeyboardsJoinedColorsRow,
  switches: Switch,
  keycaps: Keycap,
}

export const mods: Mod[] = [
  {
    title: "Stabilizatori",
    desc: "Najbitnije od najbitnijeg su svakako stabilizatori. Nepodmazani i neuravnoteženi stabilizatori su najčešći razlog lošeg zvuka i osećaja pri kucanju. Zato je njihovo sređivanje nezaobilazan korak naše usluge - svaka tastatura koju naručite kod nas dolazi sa podmazanim i uravnoteženim stabilizatorima.",
    price: 0,
    required: true,
    key: "stabilisers",
  },
  {
    title: "Tape Mod",
    desc: "Ovaj mod je jedan od najpopularnijih i najlakših modova i podrazumeva lepljenje jednog do dva sloja trake na poleđinu ploče tastature. Doprinosi tišem i dubljem zvuku. S obzirom da je u pitanju vrlo lak mod, koji gotovo uvek drastično pomogne celopkupnom zvuku tastature, nudimo ga besplatno, ali imate i opciju da ga preskočite ili eventualno uradite sami.",
    price: 0,
    required: false,
    key: "tapeMod",
  },
  {
    title: "Svičevi",
    desc: "Prethodna dva moda su uglavnom dovoljna da Vaša nova tastatura bude fenomenalna. Ali ako želite da je zaista podignete na sledeći nivo, želite razmisliti o ručnom podmazivanju svičeva. Lube u svičevima doprinosi glađem osećaju pri kucanju, kao i tišem i dubljem zvuku.",
    price: 1000,
    required: false,
    key: "handlubedSwitches",
  },
  {
    title: "Foam Mod",
    desc: "Foam mod podrazumeva dodavanje dodatne pene u telo tastature, koja dodatno amortizuje vibracije nastale pri kucanju. Tastature sa foam modom zato karakteriše tiši i dublji zvuk.",
    price: 200,
    required: false,
    key: "extraFoam",
  },
]

export const orderSchema = insertOrderSchema
