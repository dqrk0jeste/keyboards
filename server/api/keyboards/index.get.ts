import { eq, gt } from "drizzle-orm"
import { db } from "~/server/db"
import { keyboardColors, keyboards } from "~/server/db/schema"
import { translateToKeyboardWithColorOptions } from "~/server/utils/translate"

export default defineEventHandler(async () => {
  const result = await db
    .select()
    .from(keyboards)
    .innerJoin(keyboardColors, eq(keyboards.id, keyboardColors.keyboardId))
    .where(gt(keyboardColors.stock, 0))

  return translateToKeyboardWithColorOptions(result)
})
