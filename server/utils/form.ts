import { z } from "zod"
import { Keycap, Switch } from "../db/schema"

export const bodySchema = z.object({
  format: zFormats,
  pudding: z.boolean(),
  mainColor: zColors,
  otherColor: zColors.or(z.null()),
  switchTypes: zSwitchTypes.array(),
  bluetooth: z.boolean(),
  wireless: z.boolean(),
})

export type FilterReturn<T> = {
  matching: T[],
  other: T[],
}

export type FormBody = z.infer<typeof bodySchema>

export type FormReturn = {
  keyboards: FilterReturn<KeyboardsJoinedColorsRow>,
  switches: FilterReturn<Switch>,
  keycaps: FilterReturn<Keycap>,
}
