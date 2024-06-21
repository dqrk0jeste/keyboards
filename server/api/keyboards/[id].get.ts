import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { keyboards, keyboardColors, type KeyboardWithColorOptions } from "~/server/db/schema"
import { type Color } from "~/server/utils/enums"

export default defineEventHandler(async (e): Promise<KeyboardWithColorOptions> => {
  const id = getRouterParam(e, 'id')

  const result = await db
    .select()
    .from(keyboards)
    .innerJoin(keyboardColors, eq(keyboards.id, keyboardColors.keyboardId))
    .where(eq(keyboards.id, id!))

  if(result.length === 0) {
    throw createError({
      statusCode: 404,
    })
  }

  const colorOptions = result.map(keyboard => {
    return {
      id: keyboard.keyboard_colors.id,
      color: keyboard.keyboard_colors.color as Color,
      stock: keyboard.keyboard_colors.stock,
    }
  })

  return {
    ...result[0].keyboards,
    colorOptions,
  }
})
