import { z } from "zod"
import { db } from "~/server/db"
import { insertKeyboardSchema, insertKeyboardColorSchema, keyboardColors, keyboards } from "~/server/db/schema"

const bodySchema = insertKeyboardSchema.and(
  z.object({
    colors: insertKeyboardColorSchema.omit({ keyboardId: true }).array(),
  })
)

export default defineEventHandler(async (e) => {
  const isAuthed = authAdmin(e)
  if(!isAuthed) {
    throw createError({
      statusCode: 401,
    })
  }

  const body = await readBody(e)
  const parsed = bodySchema.safeParse(body)
  if(!parsed.success) {
    throw createError({
      statusCode: 400,
    })
  }

  const result = await db
    .insert(keyboards)
    .values(parsed.data)
    .returning()

  const colors = await db
    .insert(keyboardColors)
    .values(parsed.data.colors.map(c => {
      return {
        ...c,
        keyboardId: result[0].id,
      }
    }))
    .returning()

  return {
    ...result[0],
    colors,
  }
})
