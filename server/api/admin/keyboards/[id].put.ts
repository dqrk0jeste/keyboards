import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { insertKeyboardSchema, keyboards } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id')

  const body = await readBody(e)
  const result = insertKeyboardSchema.safeParse(body)
  if(!result.success) {
    throw createError({
      statusCode: 400,
    })
  }

  const newKeyboard = await db.update(keyboards).set(result.data).where(eq(keyboards.id, id!)).returning()

  return newKeyboard
})
