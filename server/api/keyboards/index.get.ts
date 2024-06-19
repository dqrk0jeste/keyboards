import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { Keyboard, keyboardColors, keyboards } from "~/server/db/schema"

type KeyboardWithColorOptions = {
  keyboard: Keyboard,
  colorOptions: Color,
}
export default defineEventHandler(async (e) => {
  const result = await db.select().from(keyboards).innerJoin(keyboardColors, eq(keyboardColors.keyboardId, keyboards.id))
  const response = [] as KeyboardWithColors
})
