import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { keyboardColors } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const isAuthed = authAdmin(e)
  if(!isAuthed) {
    throw createError({
      statusCode: 401,
    })
  }

  const id = getRouterParam(e, 'id')

  const body = await readBody(e)
  if(body.stock) {
    throw createError({
      statusCode: 400,
    })
  }

  const result = await db.update(keyboardColors).set({ stock: body.stock }).where(eq(keyboardColors.id, id!)).returning()
  return result[0]
})
