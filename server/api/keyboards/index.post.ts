import { db } from "~/server/db"
import { insertKeyboardSchema, keyboards } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const isAuthed = authAdmin(e)
  if(!isAuthed) {
    throw createError({
      statusCode: 401,
    })
  }

  const body = await readBody(e)
  const parsed = insertKeyboardSchema.safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400,
    })
  }
  const result = await db.insert(keyboards).values(parsed.data).returning()
  return result[0]
})
