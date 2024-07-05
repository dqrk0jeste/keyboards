import { z } from "zod"
import { Keyboard, Keycap, Switch } from "../db/schema"
import { KeyboardsJoinedColorsRow } from "./translate"

export const bodySchema = z.object({
  format: zFormats,
  pudding: z.boolean(),
  mainColor: zColors,
  otherColor: zColors.or(z.null()),
  switchType: zSwitchTypes,
  bluetooth: z.boolean(),
  wireless: z.boolean(),
})

export type FormBody = z.infer<typeof bodySchema>

export type FormReturn = {
  matchingKeyboards: KeyboardsJoinedColorsRow[],
  blackOrWhiteKeyboards: KeyboardsJoinedColorsRow[],
  matchingSwitches: Switch[],
  matchingKeycaps: Keycap[],
}
