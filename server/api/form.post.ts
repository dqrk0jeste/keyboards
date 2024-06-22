import { z } from "zod"
import { db } from "../db"
import { type Keyboard, keyboards, type Switch, switches, type Keycap, keycaps, keyboardColors, KeyboardColor } from "../db/schema"
import { asc, eq, gt } from "drizzle-orm"
import { colors as colorOptions, formats as formatOptions, switchTypes as switchTypeOptions } from "../utils/enums"

const formats = z.enum(formatOptions)
const colors = z.enum(colorOptions)
const switchTypes = z.enum(switchTypeOptions)

const bodySchema = z.object({
  format: formats,
  pudding: z.boolean(),
  mainColor: colors,
  otherColor: colors.or(z.null()),
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
  format: Format,
  bluetooth: boolean,
  wireless: boolean,
  mainColor: Color,
  otherColor: Color | null,
  pudding: boolean,
}

function filterKeyboards(keyboards: KeyboardWithColor[], options: FilterKeyboardsOptions): Filter<KeyboardWithColor> {
  const matchingMainColor = [] as KeyboardWithColor[]
  const matchingSecondaryColor = [] as KeyboardWithColor[]
  const other = [] as KeyboardWithColor[]

  for(const keyboard of keyboards) {
    if(
      keyboard.keyboards.format === options.format
      && (!options.wireless || keyboard.keyboards.isWireless)
      && (!options.bluetooth || keyboard.keyboards.isBluetooth)
      && (!options.pudding || keyboard.keyboards.hasRGB)
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
  otherColor: Color | null,
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
      if(a.rank === b.rank) {
        return a.value.price - b.value.price
      }
      return a.rank - b.rank
    }).map(r => r.value),
    other: other.sort((a, b) => a.price - b.price),
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
    db
      .select()
      .from(keyboards)
      .innerJoin(keyboardColors, eq(keyboards.id, keyboardColors.keyboardId))
      .where(gt(keyboardColors.stock, 0))
      .orderBy(asc(keyboardColors.price)),
    db
      .select()
      .from(switches)
      .where(gt(switches.stock, 0))
      .orderBy(asc(switches.price)),
    db
      .select()
      .from(keycaps)
      .where(gt(keycaps.stock, 0)),
  ])

  const keyboardResponse = filterKeyboards(keyboardWithColorsOptions, { format, mainColor, otherColor, bluetooth, wireless, pudding })
  const switchResponse = filterSwitches(switchOptions, switchType)
  const keycapResponse = filterKeycaps(keycapOptions, { pudding, mainColor, otherColor })

  return {
    matchingKeyboards: keyboardResponse.matching,
    otherKeyboards: keyboardResponse.other,
    matchingSwitches: switchResponse.matching,
    otherSwitches: switchResponse.other,
    matchingKeycaps: keycapResponse.matching,
    otherKeycaps: keycapResponse.other,
  }
})

