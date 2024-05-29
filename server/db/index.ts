import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const { databaseUrl } = useRuntimeConfig()

const sql = neon(databaseUrl)
export const db = drizzle(sql, { schema })

