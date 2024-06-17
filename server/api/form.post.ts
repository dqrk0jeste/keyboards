import { z } from "zod"
import { db } from "../db"
import { type Keyboard, keyboards, type Switch, switches, type Keycap, keycaps, keyboardColors, KeyboardColor } from "../db/schema"
import { eq } from "drizzle-orm"

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

type KeyboardWithColor = {
  keyboards: Keyboard,
  keyboard_colors: KeyboardColor,
}
type FilterKeyboardsReturn = {
  matching: {
    keyboards: Keyboard,
    keyboard_colors: KeyboardColor,
  }[],
  other: {
    keyboards: Keyboard,
    keyboard_colors: KeyboardColor,
  }[], 
} 

type FilterKeyboardsOptions = {
  maxPrice: number,
  format: Format,
  bluetooth: boolean,
  wireless: boolean,
  colors: Color[],
}

function filterKeyboards(keyboards: KeyboardWithColor[], options: FilterKeyboardsOptions): FilterKeyboardsReturn {
  const matching = keyboards.filter(keyboard => {
      return keyboard.keyboards.price <= options.maxPrice - 5000
      && keyboard.keyboards.format === options.format
      && (!options.wireless || keyboard.keyboards.isWireless)
      && (!options.bluetooth || keyboard.keyboards.isBluetooth)
      && options.colors.includes(keyboard.keyboard_colors.color as Color)
    })
}

function filterPrebuiltKeyboards(keyboards: KeyboardWithColor[], options: FilterKeyboardsOptions): FilterKeyboardsReturn {
  return keyboards.filter(keyboard => {
    return keyboard.keyboards.isPrebuilt
      && keyboard.keyboards.price <= options.maxPrice
      && keyboard.keyboards.format === options.format
      && (!options.wireless || keyboard.keyboards.isWireless)
      && (!options.bluetooth || keyboard.keyboards.isBluetooth)
      && options.colors.includes(keyboard.keyboard_colors.color as Color)
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
    const keycapColors = keycap.accentColors?.split(' ')
    const hasRightColorsInAccent = keycapColors?.reduce((current, color) => {
      return current || options.colors.includes(color as Color)
    }, false)
    return (options.colors.includes(keycap.mainColor as Color)
      || hasRightColorsInAccent)
      && (!options.pudding || keycap.isPudding)
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
  // rangiranje ce da ide po bojama, boje se daju sa tezinama, tako da donose 2 ili 1 poen.
  const possibleSwitches = filterSwitches(switchOptions, switchType)
  const possibleKeycaps = filterKeycaps(keycapOptions, { pudding, colors })

  const possiblePrebuilts = filterPrebuiltKeyboards(keyboardWithColorsOptions, { maxPrice, format, colors, bluetooth, wireless })
})

