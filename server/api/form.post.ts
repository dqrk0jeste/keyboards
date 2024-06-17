import { z } from "zod"
import { db } from "../db"
import { type Keyboard, keyboards, type Switch, switches, type Keycap, keycaps, keyboardColors, KeyboardColor } from "../db/schema"
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
  colors: colors.array().nonempty().max(2),
  switchType: switchTypes,
  bluetooth: z.boolean(),
  wireless: z.boolean(),
})

function filterKeyboards(keyboards: {
  keyboard: Keyboard,
  keyboard_color: KeyboardColor,
}[], options: {
  maxPrice: number,
  format: Format,
  bluetooth: boolean,
  wireless: boolean,
  colors: Color[],
}): {
  keyboard: Keyboard,
  keyboard_color: KeyboardColor,
}[] {
  return keyboards.filter(keyboard => {
      return keyboard.keyboard.price <= options.maxPrice - 5000
      && keyboard.keyboard.format === options.format
      && (!options.wireless || keyboard.keyboard.isWireless)
      && (!options.bluetooth || keyboard.keyboard.isBluetooth)
      && options.colors.includes(keyboard.keyboard_color.color as Color)
    }) 
}

function filterPrebuiltKeyboards(keyboards: {
  keyboard: Keyboard,
  keyboard_color: KeyboardColor,
}[], options: {
  maxPrice: number,
  format: Format,
  bluetooth: boolean,
  wireless: boolean,
  colors: Color[],
}): {
  keyboard: Keyboard,
  keyboard_color: KeyboardColor,
}[] {
  return keyboards.filter(keyboard => {
    return keyboard.keyboard.isPrebuilt
      && keyboard.keyboard.price <= options.maxPrice
      && keyboard.keyboard.format === options.format
      && (!options.wireless || keyboard.keyboard.isWireless)
      && (!options.bluetooth || keyboard.keyboard.isBluetooth)
      && options.colors.includes(keyboard.keyboard_color.color as Color)
  }) 
}

function filterSwitches(switches: Switch[], switchType: SwitchType): Switch[] {
   return switches.filter(s => s.type === switchType)
}

function filterKeycaps(keycaps: Keycap[], options: {
  colors: Color[],
  pudding: boolean,
}): Keycap[] {
   return keycaps.filter(keycap => {
    return options.colors.includes(keycap.mainColor as Color)
    || options.colors.includes(keycap.accentColors as Color)
  })
}

export default defineEventHandler(async (e) => {
  const body = readBody(e)
  const parsed = bodySchema.safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400,
    })
  }

  const {
    maxPrice,
    format,
    colors,
    switchType,
    pudding,
    bluetooth,
    wireless
  } = parsed.data

  const [
    keyboardWithColorsOptions,
    switchOptions,
    keycapOptions,
  ] = await Promise.all([
    db.select().from(keyboards).innerJoin(keyboardColors, eq(keyboards.id, keyboardColors.keyboardId)),
    db.select().from(switches),
    db.select().from(keycaps),
  ])

  const possibleKeyboards = filterKeyboards(keyboardWithColorsOptions, { maxPrice, format, colors, bluetooth, wireless })
  const possibleSwitches = filterSwitches(switchOptions, switchType)

  const possiblePrebuilts = filterPrebuiltKeyboards(keyboardWithColorsOptions, { maxPrice, format, colors, bluetooth, wireless })
  
})

