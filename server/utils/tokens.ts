import jwt from 'jsonwebtoken'

const { accessTokenSecret, refreshTokenSecret } = useRuntimeConfig()

export function generateAccessToken(payload: Object = {}, expiresIn: string = '15m') {
  return jwt.sign(
    payload,
    accessTokenSecret,
    {
      expiresIn,
    }
  )
} 

export function generateRefreshToken(payload: Object = {}, expiresIn: string = '30 days') {
  return jwt.sign(
    payload,
    refreshTokenSecret,
    {
      expiresIn,
    }
  )
} 

export function verifyAccessToken(token: string): string | jwt.JwtPayload {
  try {
    const payload = jwt.verify(token, accessTokenSecret)
    return payload
  } catch(e: any) {
    throw createError({
      statusCode: 403,
    })
  }
}

