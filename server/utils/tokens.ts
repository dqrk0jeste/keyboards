import jwt from 'jsonwebtoken'

const { accessTokenSecret, refreshTokenSecret } = useRuntimeConfig()

export function generateAccessToken(payload: Object) {
  return  jwt.sign(
    payload,
    accessTokenSecret,
    {
      expiresIn: '15m',
    }
  )
} 

export function generateRefreshToken(payload: Object) {
  return  jwt.sign(
    payload,
    refreshTokenSecret,
    {
      expiresIn: '30 days',
    }
  )
} 
