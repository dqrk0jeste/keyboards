import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { KeyboardColor, insertKeyboardColorSchema, keyboardColors } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  const isAuthed = authAdmin(e)
  if(!isAuthed) {
    throw createError({
      statusCode: 401,
    })
  }

  const id = getRouterParam(e, 'id')

  const body = await readBody(e)
  const parsed = insertKeyboardColorSchema.omit({ keyboardId: true }).array().safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400,
    })
  }

  await db
    .delete(keyboardColors)
    .where(eq(keyboardColors.keyboardId, id!))

  const result = await db
    .insert(keyboardColors)
    .values(parsed.data.map(c => {
      return {
        ...c,
        keyboardId: id!,
      }
    }))
    .returning()

  return result
})
