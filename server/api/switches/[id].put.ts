import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { insertSwitchSchema, switches } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const isAuthed = authAdmin(e)
  if(!isAuthed) {
    throw createError({
      statusCode: 401,
    })
  }

  const id = getRouterParam(e, 'id')

  const body = await readBody(e)
  const parsed = insertSwitchSchema.safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400,
    })
  }

  const result = await db
    .update(switches)
    .set(parsed.data)
    .where(eq(switches.id, id!))
    .returning()

  return result[0]
})
