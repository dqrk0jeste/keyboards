import { z } from "zod"

export const zFormats = z.enum(formats)
export const zColors = z.enum(colors)
export const zSwitchTypes = z.enum(switchTypes)

export const bodySchema = z.object({
  format: zFormats,
  pudding: z.boolean(),
  mainColor: zColors,
  otherColor: zColors.or(z.null()),
  switchType: zSwitchTypes,
  bluetooth: z.boolean(),
  wireless: z.boolean(),
})
