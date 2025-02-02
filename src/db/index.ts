import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '@/lib/env/server'

import * as schema from './schemas/index'

export const client = postgres(env.DATABASE_URL, {
	max: env.DB_MIGRATING ? 1 : undefined,
})
const db = drizzle(client, {
	schema,
})
export default db
