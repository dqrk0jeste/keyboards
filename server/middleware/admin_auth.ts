export default defineEventHandler((e) => {
  if(pathStartsWith(e, '/admin') && !pathIs(e, '/admin/login')) {
    const authHeader = getHeader(e, 'Authorization')
    if(
      !authHeader ||
      authHeader.split(' ').length !== 2 ||
      authHeader.split(' ')[0] !== 'Bearer'
    ) {
      throw createError({
        statusCode: 401,
      })
    }
    const accessToken = authHeader.split(' ')[1]
    verifyAccessToken(accessToken)
  }
})


