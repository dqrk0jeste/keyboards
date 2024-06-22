import { z } from "zod"
import { db } from "~/server/db"
import { insertKeyboardSchema, keyboardColors, keyboards } from "~/server/db/schema"

const bodySchema = insertKeyboardSchema.and(
  z.object({
    colorOptions: z.object({
      color: z.enum(colors),
      price: z.number().gt(0),
      stock: z.number().gt(0),
    }).array(),
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

  const colorOptions = await db
    .insert(keyboardColors)
    .values(parsed.data.colorOptions.map(c => {
      return {
        ...c,
        keyboardId: result[0].id,
      }
    }))
    .returning()

  return {
    ...result[0],
    colorOptions,
  }
})
