import { db } from "~/server/db"
import { insertKeyboardSchema, keyboards } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const result = insertKeyboardSchema.safeParse(body)
  if(!result.success) {
    throw createError({
      statusCode: 400,
    })
  }
  const newKeyboard = await db.insert(keyboards).values(result.data).returning()
  return newKeyboard
})
