import { eq, sql } from "drizzle-orm"
import { db } from "~/server/db"
import { insertOrderSchema, keyboardColors, keycaps, orders, switches } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const parsed = insertOrderSchema.omit({ shippedAt: true }).safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400,
    })
  }

  const [[keyboardResult], [switchResult], [keycapResult]] = await db.batch([
    db
      .select()
      .from(keyboardColors)
      .where(eq(keyboardColors.id, parsed.data.keyboardColorId)),
    db
      .select()
      .from(switches)
      .where(eq(switches.id, parsed.data.switchId)),
    db
      .select()
      .from(keycaps)
      .where(eq(keycaps.id, parsed.data.keycapId)),
  ])

  if(keyboardResult.stock <= 0 || switchResult.stock <= 0 || keycapResult.stock <= 0) {
    throw createError({
      statusCode: 400,
    })
  }

  const result = await db
    .insert(orders)
    .values(parsed.data)
    .returning()

  await db.batch([
    db
      .update(keyboardColors)
      .set({ stock: sql`${ keyboardColors.stock } - 1`})
      .where(eq(keyboardColors.id, parsed.data.keyboardColorId)),
    db
      .update(switches)
      .set({ stock: sql`${ switches.stock } - 1`})
      .where(eq(switches.id, parsed.data.switchId)),
    db
      .update(keycaps)
      .set({ stock: sql`${ keycaps.stock } - 1`})
      .where(eq(keycaps.id, parsed.data.keycapId)),
  ])

  return result[0]
})
