import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { keycaps } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id')
  const result = await db.select().from(keycaps).where(eq(keycaps.id, id!))
  if(result.length === 0) {
    throw createError({
      statusCode: 404,
    })
  }

  return result[0]
})
