import { z } from "zod"
import { db } from "../db"
import { type Keyboard, keyboards, type Switch, switches, type Keycap, keycaps } from "../db/schema"
import { eq, lte, and } from "drizzle-orm"

const formats = z.enum([
  "60%",
  "65%",
  "75%",
  "TKL",
  "100%",
])

type Format = z.infer<typeof formats>

const colors = z.enum([
  "white",
  "black",
  "blue",
  "red",
  "yellow",
  "green",
  "purple",
  "orange",
])

type Color = z.infer<typeof colors>

const switchTypes = z.enum([
  "linear",
  "tactile",
  "clicky",
  "silent",
])

type SwitchType = z.infer<typeof switchTypes>

const bodySchema = z.object({
  maxPrice: z.number().gt(5000).finite(),
  format: formats,
  pudding: z.boolean(),
  color: colors,
  switches: switchTypes,
  bluetooth: z.boolean(),
  wireless: z.boolean(),
})

async function getKeyboards(options: {
  maxPrice: number,
  format: Format,
  bluetooth: boolean,
  wireless: boolean,
}): Promise<Keyboard[]> {
  return db.select().from(keyboards).where(
    and(
      lte(keyboards.price, options.maxPrice - 5000),
      eq(keyboards.format, options.format),
      eq(keyboards.isBluetooth, options.bluetooth),
      eq(keyboards.isWireless, options.wireless),
    )
  )
}

async function getPrebuiltKeyboards(options: {
  maxPrice: number,
  format: Format,
  bluetooth: boolean,
  wireless: boolean,
}): Promise<Keyboard[]> {
  return db.select().from(keyboards).where(
    and(
      lte(keyboards.price, options.maxPrice),
      eq(keyboards.format, options.format),
      eq(keyboards.isBluetooth, options.bluetooth),
      eq(keyboards.isWireless, options.wireless),
    )
  )
}

async function getSwitches(switchType: SwitchType): Promise<Switch[]> {
  return db.select().from(switches).where(
    eq(switches.type, switchType),
  )
}

async function getKeycaps(options: {
  color: Color,
  pudding: boolean,
}): Promise<Keycap[]> {
  return db.select().from(keycaps).where(
    and(
      eq(keycaps.mainColor, options.color),
      eq(keycaps.isPudding, options.pudding),
    )
  )
}

export default defineEventHandler(async (e) => {
  const body = readBody(e)
  const parsed = bodySchema.safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400,
    })
  }

  const { maxPrice, format, color, switches, pudding, bluetooth, wireless } = parsed.data
  // const result = await Promise.all([
  //   getKeyboards({ maxPrice, format, co }),
  //   getPrebuiltKeyboards(),
  //
  // ])
})

