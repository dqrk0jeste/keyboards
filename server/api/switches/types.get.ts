import { db } from "~/server/db"
import { switches } from "~/server/db/schema"

export default defineEventHandler(async () => {
  return await db.selectDistinct({ type: switches.type }).from(switches)
})
