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

export type ModKeys = "handlubedSwitches" | "extraFoam" | "tapeMod"

export type Mod = {
  title: string,
  desc: string,
  price: number,
} & ({
  required: false,
  key: ModKeys,
} | {
  required: true,
  key: null,
}
)

export const orderSchema = insertOrderSchema
