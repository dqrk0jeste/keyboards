import { z } from "zod"

export const bodySchema = z.object({
  format: zFormats,
  pudding: z.boolean(),
  mainColor: zColors,
  otherColor: zColors.or(z.null()),
  switchType: zSwitchTypes,
  bluetooth: z.boolean(),
  wireless: z.boolean(),
})
