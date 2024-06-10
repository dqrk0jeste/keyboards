import bcrypt from 'bcrypt'

export default defineEventHandler(async (e) => {
  const { key } = await readBody(e)
  if(!key) {
    throw createError({
      statusCode: 400
    })
  }

  const { adminKey } = useRuntimeConfig()
  const isValidKey = await bcrypt.compare(key, adminKey)
  if(!isValidKey) {
    throw createError({
      statusCode: 403,
    })
  }

  return {
    accessToken: generateAccessToken({}, '6h'),
  }
})
