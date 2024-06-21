import { db } from "~/server/db"
import { switches } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  return await db
    .select()
    .from(switches)
})
