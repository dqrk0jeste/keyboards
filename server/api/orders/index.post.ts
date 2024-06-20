import { eq, sql } from "drizzle-orm"
import { db } from "~/server/db"
import { insertOrderSchema, keyboardColors, keycaps, orders, switches } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const parsed = insertOrderSchema.safeParse(body)
  if(!parsed.success || parsed.data.sentAt) {
    throw createError({
      statusCode: 400,
    })
  }

  const result = await db.insert(orders).values(parsed.data).returning()

  await Promise.all([
    db.update(keyboardColors).set({ stock: sql`${ keyboardColors.stock } - 1`}).where(eq(keyboardColors.id, parsed.data.keyboardColorId)),
    db.update(switches).set({ stock: sql`${ switches.stock } - 1`}).where(eq(switches.id, parsed.data.switchId)),
    db.update(keycaps).set({ stock: sql`${ keycaps.stock } - 1`}).where(eq(keycaps.id, parsed.data.keycapId)),
  ])

  return result[0]
})
