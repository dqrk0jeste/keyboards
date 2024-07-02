import { db } from "~/server/db"
import { keyboards } from "~/server/db/schema"

export default defineEventHandler(async () => {
  return await db.selectDistinct({ format: keyboards.format }).from(keyboards)
})
