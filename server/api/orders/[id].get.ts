import { orders } from "~/server/db/schema"
import { db } from "~/server/db"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id')
  const result = await db.select().from(orders).where(eq(orders.id, id!))
  if(result.length == 0) {
    throw createError({
      statusCode: 404,
    })
  }
  return result[0]
})
