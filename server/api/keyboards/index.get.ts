import { eq, gt } from "drizzle-orm"
import { db } from "~/server/db"
import { Keyboard, keyboardColors, keyboards } from "~/server/db/schema"
import { type Color } from "~/server/utils/enums"

type KeyboardWithColorOptions = Keyboard & {
  colorOptions: {
    id: string,
    color: Color,
  }[],
}

export default defineEventHandler(async (e) => {
  const result = await db.select()
    .from(keyboards)
    .innerJoin(keyboardColors, eq(keyboards.id, keyboardColors.keyboardId))
    .where(gt(keyboardColors.stock, 0))

  type K = typeof result[number]
  const response = [] as KeyboardWithColorOptions[]

  for(let i = 0; i < result.length; i++) {
    if(i === 0 || result[i].keyboards.id !== result[i - 1].keyboards.id) {
      response.push({
        ...result[i].keyboards,
        colorOptions: [{
          id: result[i].keyboard_colors.id,
          color: result[i].keyboard_colors.color as Color,
        }],
      })
    } else {
      response[response.length - 1].colorOptions.push({
        id: result[i].keyboard_colors.id,
        color: result[i].keyboard_colors.color as Color
      })
    }
  }
  
  return response
})
