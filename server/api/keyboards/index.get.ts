import { db } from "~/server/db"
import { keyboards } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  return await db.select().from(keyboards)
})
