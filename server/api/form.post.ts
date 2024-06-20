import { z } from "zod"
import { db } from "../db"
import { type Keyboard, keyboards, type Switch, switches, type Keycap, keycaps, keyboardColors, KeyboardColor } from "../db/schema"
import { eq, gt } from "drizzle-orm"
import { colors as colorOptions, formats as formatOptions, switchTypes as switchTypeOptions } from "../utils/enums"

const formats = z.enum(formatOptions)

type Format = z.infer<typeof formats>

const colors = z.enum(colorOptions)

type Color = z.infer<typeof colors>

const switchTypes = z.enum(switchTypeOptions)

type SwitchType = z.infer<typeof switchTypes>

const bodySchema = z.object({
  maxPrice: z.number().gt(5000).finite(),
  format: formats,
  pudding: z.boolean(),
  mainColor: colors,
  otherColor: colors.nullish(),
  switchType: switchTypes,
  bluetooth: z.boolean(),
  wireless: z.boolean(),
})

type Filter<T> = {
  matching: T[],
  other: T[], 
} 

type KeyboardWithColor = {
  keyboards: Keyboard,
  keyboard_colors: KeyboardColor,
}

type FilterKeyboardsOptions = {
  maxPrice: number,
  format: Format,
  bluetooth: boolean,
  wireless: boolean,
  mainColor: Color,
  otherColor: Color | undefined | null,
}

function filterKeyboards(keyboards: KeyboardWithColor[], options: FilterKeyboardsOptions): Filter<KeyboardWithColor> {
  const matchingMainColor = [] as KeyboardWithColor[]
  const matchingSecondaryColor = [] as KeyboardWithColor[]
  const other = [] as KeyboardWithColor[]
  for(const keyboard of keyboards) {
    if(
      keyboard.keyboards.price <= options.maxPrice - 5000
      && keyboard.keyboards.format === options.format
      && (!options.wireless || keyboard.keyboards.isWireless)
      && (!options.bluetooth || keyboard.keyboards.isBluetooth)
    ) {
      if(options.mainColor === keyboard.keyboard_colors.color) {
        matchingMainColor.push(keyboard)
      } else if(
        options.otherColor === keyboard.keyboard_colors.color
        || keyboard.keyboard_colors.color === "black"
        || keyboard.keyboard_colors.color === "white"
      ) {
        matchingSecondaryColor.push(keyboard)
      }
    } else {
      other.push(keyboard)
    }
  }

  return {
    matching: [...matchingMainColor, ...matchingSecondaryColor],
    other,
  }
}

function filterPrebuiltKeyboards(keyboards: KeyboardWithColor[], options: FilterKeyboardsOptions): Filter<KeyboardWithColor> {
  const matchingMainColor = [] as KeyboardWithColor[]
  const matchingSecondaryColor = [] as KeyboardWithColor[]
  const other = [] as KeyboardWithColor[]
  for(const keyboard of keyboards) {
    if(
      keyboard.keyboards.isPrebuilt
      && keyboard.keyboards.price <= options.maxPrice
      && keyboard.keyboards.format === options.format
      && (!options.wireless || keyboard.keyboards.isWireless)
      && (!options.bluetooth || keyboard.keyboards.isBluetooth)
    ) {
      if(options.mainColor === keyboard.keyboard_colors.color) {
        matchingMainColor.push(keyboard)
      } else if(options.otherColor === keyboard.keyboard_colors.color) {
        matchingSecondaryColor.push(keyboard)
      }
    } else {
      other.push(keyboard)
    }
  }

  return {
    matching: [...matchingMainColor, ...matchingSecondaryColor],
    other,
  }
}

function filterSwitches(switches: Switch[], switchType: SwitchType): Filter<Switch> {
  const matching = [] as Switch[]
  const other = [] as Switch[]
  for(const s of switches) {
    if(s.type === switchType) {
      matching.push(s)
    } else {
      other.push(s)
    }
  }
  return {
    matching,
    other,
  }
}

type FilterKeycapsOptions = {
  mainColor: Color,
  otherColor: Color | undefined | null,
  pudding: boolean,
}

type Ranking<T> = {
  value: T,
  rank: number,
}

function filterKeycaps(keycaps: Keycap[], options: FilterKeycapsOptions): Filter<Keycap> {
  const matching = [] as Ranking<Keycap>[]
  const other = [] as Keycap[]

  for(const keycap of keycaps) {
    const entry = {
      value: keycap,
      rank: 0,
    }

    if(keycap.mainColor === options.mainColor) {
      entry.rank += 3
    } else if(keycap.mainColor === options.otherColor) {
      entry.rank += 1
    }

    if(keycap.accentColors) {
      const accentColors = keycap.accentColors.split(' ') as Color[]
      if(accentColors.includes(options.mainColor)) {
        entry.rank += 1
      }
      if(options.otherColor && accentColors.includes(options.otherColor)) {
        entry.rank += 1
      }
    }

    if(entry.rank === 0) {
      other.push(keycap)
    } else if(!options.pudding || keycap.isPudding){
      matching.push(entry)
    } else {
      other.push(keycap)
    }
  }

  return {
    matching: matching.sort((a, b) => {
      if(a.rank > b.rank) {
        return 1
      }
      return -1
    }).map(r => r.value),
    other,
  }
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
    mainColor,
    otherColor,
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
    db.select().from(keyboards).innerJoin(keyboardColors, eq(keyboards.id, keyboardColors.keyboardId)).where(gt(keyboardColors.stock, 0)),
    db.select().from(switches).where(gt(switches.stock, 0)),
    db.select().from(keycaps).where(gt(keycaps.stock, 0)),
  ])

  const keyboardResponse = filterKeyboards(keyboardWithColorsOptions, { maxPrice, format, mainColor, otherColor, bluetooth, wireless })
  const switchResponse = filterSwitches(switchOptions, switchType)
  const keycapResponse = filterKeycaps(keycapOptions, { pudding, mainColor, otherColor })
  const prebuilts = filterPrebuiltKeyboards(keyboardWithColorsOptions, { maxPrice, format, mainColor, otherColor, bluetooth, wireless })

  return {
    matchingKeyboards: keyboardResponse.matching,
    otherKeyboards: keyboardResponse.other,
    matchingSwitches: switchResponse.matching,
    otherSwitches: switchResponse.other,
    matchingKeycaps: keycapResponse.matching,
    otherKeycaps: keycapResponse.other,
    prebuilts,
  }
})

