import { db } from "~/server/db"
import { keycaps } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  return await db
    .select()
    .from(keycaps)
})
