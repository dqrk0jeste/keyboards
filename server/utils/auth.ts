import { type H3Event, EventHandlerRequest } from 'h3'

export function authAdmin(e: H3Event<EventHandlerRequest>): boolean {
  const authHeader = getHeader(e, 'Authorization')
  if(
    !authHeader ||
    authHeader.split(' ').length !== 2 ||
    authHeader.split(' ')[0] !== 'Bearer'
  ) {
    return false
  }

  const accessToken = authHeader.split(' ')[1]
  const { error } = verifyAccessToken(accessToken)
  if(error) {
    return false
  }

  return true
}

