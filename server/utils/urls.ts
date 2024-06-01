import { type H3Event, EventHandlerRequest } from 'h3'

export function pathStartsWith(e: H3Event<EventHandlerRequest>, s: string): boolean {
  return getRequestURL(e).pathname.startsWith(s)
}

export function pathIs(e: H3Event<EventHandlerRequest>, s: string): boolean {
  return getRequestURL(e).pathname === s
}
