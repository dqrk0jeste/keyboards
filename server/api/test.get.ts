import { db } from "../db/index"
import { keyboards } from "../db/schema"

export default defineEventHandler(async () => {
  // await db.insert(keyboards).values({
  //   name: 'testna tastatura broj 1',
  //   price: 9000,
  //   description: 'ovo je prva tastatura u bazi',
  // })
  return await db.select().from(keyboards)
})
