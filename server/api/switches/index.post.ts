import { db } from "~/server/db"
import { insertSwitchSchema, switches } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const isAuthed = authAdmin(e)
  if(!isAuthed) {
    throw createError({
      statusCode: 401,
    })
  }

  const body = await readBody(e)
  const parsed = insertSwitchSchema.safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400,
    })
  }
  const result = await db.insert(switches).values(parsed.data).returning()
  return result[0]
})
