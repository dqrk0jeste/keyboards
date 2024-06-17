import { db } from "~/server/db"
import { insertOrderSchema, orders } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const parsed = insertOrderSchema.safeParse(body)
  if(!parsed.success || parsed.data.sentAt) {
    throw createError({
      statusCode: 400,
    })
  }

  const result = await db.insert(orders).values(parsed.data).returning()
  return result[0]
})
