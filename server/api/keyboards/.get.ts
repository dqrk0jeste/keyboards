import { db } from "~/server/db"
import { keyboards } from "~/server/db/schema"

export default defineEventHandler(async (e) => {
  return await db.select().from(keyboards)
  // ostavljam ovo kao komentar ovde, da ne zaboravim:
  // najgenijalnija ideja: imamo kao pitanja o tome kako zeli da mu izgleda tastatura, kakve switcheve voli itd. i onda mu se generise takva tastatura, posle toga moze da menja sta mu se ne svidja itd i onda da naruci. genijalno!
})
