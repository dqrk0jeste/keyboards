import jwt from 'jsonwebtoken'

const { accessTokenSecret, refreshTokenSecret } = useRuntimeConfig()

export function generateAccessToken(payload: Object, expiresIn: string = '15m') {
  return jwt.sign(
    payload,
    accessTokenSecret,
    {
      expiresIn,
    }
  )
} 

export function generateRefreshToken(payload: Object, expiresIn: string = '30 days') {
  return jwt.sign(
    payload,
    refreshTokenSecret,
    {
      expiresIn,
    }
  )
} 

type verifyAccessTokenReturn = {
  error: any,
  payload: null, 
} | {
  error: null,
  payload: jwt.JwtPayload,
}

export function verifyAccessToken(token: string): verifyAccessTokenReturn {
  try {
    const payload = jwt.verify(token, accessTokenSecret)
    return {
      error: null,
      payload: payload as jwt.JwtPayload,
    }
  } catch(e: any) {
    return {
      error: e,
      payload: null,
    }
  }
}

