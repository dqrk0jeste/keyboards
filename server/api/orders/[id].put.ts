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

  const body = await readBody(e)
  if(!body.shippedAt) {
    throw createError({
      statusCode: 400,
    })
  }

  const result = await db
    .update(orders)
    .set({ shippedAt: body.shippedAt })
    .where(eq(orders.id, id!))
    .returning()

  return result[0]
})
