import { eq, gt } from "drizzle-orm"
import { db } from "~/server/db"
import { keyboardColors, keyboards } from "~/server/db/schema"

export default defineEventHandler(async () => {
  const result = await db
    .select(keyboardsJoinedColorRow)
    .from(keyboards)
    .innerJoin(keyboardColors, eq(keyboards.id, keyboardColors.keyboardId))
    .where(gt(keyboardColors.stock, 0))

  return result
})
