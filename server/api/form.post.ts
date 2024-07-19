import { db } from "../db"
import { keyboards, Switch, switches, Keycap, keycaps, keyboardColors } from "../db/schema"
import { asc, desc, eq, gt } from "drizzle-orm"

type FilterKeyboardsOptions = {
  format: Format,
  bluetooth: boolean,
  wireless: boolean,
  mainColor: Color,
  otherColor: Color | null,
  pudding: boolean,
}

function filterKeyboards(
  keyboards: KeyboardsJoinedColorsRow[], 
  options: FilterKeyboardsOptions
): FilterReturn<KeyboardsJoinedColorsRow> {
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
      } else {
        other.push(keyboard)
      }
    } else {
      other.push(keyboard)
    }
  }

  return {
    matching: [...matchingMainColor, ...matchingSecondaryColor, ...blackOrWhite],
    other,
  }
}

function filterSwitches(
  switches: Switch[],
  switchTypes: SwitchType[],
): FilterReturn<Switch> {
  const matching = [] as Switch[]
  const other = [] as Switch[]
  for(const s of switches) {
    if(switchTypes.includes(s.type)) {
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

function filterKeycaps(
  keycaps: Keycap[],
  options: FilterKeycapsOptions
): FilterReturn<Keycap> {
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

    if(options.pudding && keycap.isPudding) {
      entry.rank += 3
    } 

    if(entry.rank === 0) {
      other.push(entry.value)
    } else {
      matching.push(entry)
    }
  }

  return {
    matching: matching
      .sort((a, b) => {
        if(a.rank === b.rank) {
          return b.value.price - a.value.price
        }
        return b.rank - a.rank
      })
      .map(r => r.value),
    other,
  }
}

export default defineEventHandler(async (e): Promise<FormReturn> => {
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
    switchTypes,
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
      .orderBy(desc(keyboardColors.price)),
    db
      .select()
      .from(switches)
      .where(gt(switches.stock, 0))
      .orderBy(desc(switches.price)),
    db
      .select()
      .from(keycaps)
      .where(gt(keycaps.stock, 0)),
  ])

  const filteredKeyboards = filterKeyboards(keyboardsJoinedColors, { format, mainColor, otherColor, bluetooth, wireless, pudding })
  const filteredSwitches = filterSwitches(switchOptions, switchTypes)
  const filteredKeycaps = filterKeycaps(keycapOptions, { pudding, mainColor, otherColor })

  return {
    keyboards: filteredKeyboards,
    switches: filteredSwitches,
    keycaps: filteredKeycaps,
  }
})

