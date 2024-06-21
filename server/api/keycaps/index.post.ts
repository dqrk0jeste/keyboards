import { db } from "~/server/db"
import { insertKeycapsSchema, keycaps } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const isAuthed = authAdmin(e)
  if(!isAuthed) {
    throw createError({
      statusCode: 401,
    })
  }

  const body = await readBody(e)
  const parsed = insertKeycapsSchema.safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400,
    })
  }

  const result = await db
    .insert(keycaps)
    .values(parsed.data)
    .returning()
  
  return result[0]
})
