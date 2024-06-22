import { z } from "zod"
import { db } from "../db"
import { Keyboard, keyboards, Switch, switches, Keycap, keycaps, keyboardColors, KeyboardColor, KeyboardWithColorOptions } from "../db/schema"
import { asc, eq, gt } from "drizzle-orm"
import { colors as colorOptions, formats as formatOptions, switchTypes as switchTypeOptions } from "../utils/enums"
import { keyboardsJoinedColorRow, KeyboardsJoinedColorsRow } from "../utils/translate"

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

type FilterKeyboardsOptions = {
  format: Format,
  bluetooth: boolean,
  wireless: boolean,
  mainColor: Color,
  otherColor: Color | null,
  pudding: boolean,
}

function filterKeyboards(keyboards: KeyboardsJoinedColorsRow[], options: FilterKeyboardsOptions) {
  const matchingMainColor = [] as KeyboardsJoinedColorsRow[]
  const matchingSecondaryColor = [] as KeyboardsJoinedColorsRow[]
  const blackOrWhite = [] as KeyboardsJoinedColorsRow[]
  const other = [] as KeyboardsJoinedColorsRow[]

  for(const keyboard of keyboards) {
    if(
      keyboard.format === options.format
      && (!options.wireless || keyboard.isWireless)
      && (!options.bluetooth || keyboard.isBluetooth)
      && (!options.pudding || keyboard.hasRGB)
    ) {
      if(options.mainColor === keyboard.color) {
        matchingMainColor.push(keyboard)
      } else if(options.otherColor === keyboard.color) {
        matchingSecondaryColor.push(keyboard)
      } else if(keyboard.color === "white" || keyboard.color === "black") {
        blackOrWhite.push(keyboard)
      }
    }
  }

  return {
    matching: [...matchingMainColor, ...matchingSecondaryColor],
    blackOrWhite,
  }
}

function filterSwitches(switches: Switch[], switchType: SwitchType): Switch[] {
  const matching = [] as Switch[]
  for(const s of switches) {
    if(s.type === switchType) {
      matching.push(s)
    }
  }
  return matching
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

function filterKeycaps(keycaps: Keycap[], options: FilterKeycapsOptions): Keycap[] {
  const matching = [] as Ranking<Keycap>[]

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
      continue
    } else if(!options.pudding || keycap.isPudding){
      matching.push(entry)
    }
  }

  return matching
    .sort((a, b) => {
      if(a.rank === b.rank) {
        return a.value.price - b.value.price
      }
      return b.rank - a.rank
    })
    .map(r => r.value)
}

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const parsed = bodySchema.safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400, 
      data: parsed.error,
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
    keyboardsJoinedColors,
    switchOptions,
    keycapOptions,
  ] = await Promise.all([
    db
      .select(keyboardsJoinedColorRow)
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

  const keyboardResponse = filterKeyboards(keyboardsJoinedColors, { format, mainColor, otherColor, bluetooth, wireless, pudding })
  const switchResponse = filterSwitches(switchOptions, switchType)
  const keycapResponse = filterKeycaps(keycapOptions, { pudding, mainColor, otherColor })

  return {
    matchingKeyboards: keyboardResponse.matching,
    blackOrWhiteKeyboards: keyboardResponse.blackOrWhite,
    matchingSwitches: switchResponse,
    matchingKeycaps: keycapResponse,
  }
})

