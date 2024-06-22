import { db } from "../db"
import { keycaps } from "../db/schema"

export default defineEventHandler(async () => {
  const [ mainColors, otherColors ] = await db.batch([
    db
      .selectDistinct({ color: keycaps.mainColor })
      .from(keycaps),
    db
      .select({ colors: keycaps.accentColors })
      .from(keycaps)
  ])

  const response = mainColors.map(c => c.color)

  for(const c of otherColors) {
    if(!c.colors) {
      continue
    }

    const colors = c.colors.split(' ')
    for(const color of colors) {
      if(!response.includes(color)) {
        response.push(color)
      }
    }
  }

  return response
})
