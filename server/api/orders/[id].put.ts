import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { orders } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const isAuthed = authAdmin(e)
  if(!isAuthed) {
    throw createError({
      statusCode: 401,
    })
  }

  const id = getRouterParam(e, 'id')

  const { shippedAt } = await readBody(e)
  if(!shippedAt || typeof shippedAt !== 'string') {
    throw createError({
      statusCode: 400,
    })
  }

  const result = await db
    .update(orders)
    .set({ shippedAt: new Date(shippedAt) })
    .where(eq(orders.id, id!))
    .returning()

  return result[0]
})
