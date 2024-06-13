import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { switches } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id')
  const result = await db.select().from(switches).where(eq(switches.id, id!))
  if(result.length === 0) {
    throw createError({
      statusCode: 404,
    })
  }

  return result[0]
})
