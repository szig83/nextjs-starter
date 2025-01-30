import { defineConfig } from 'drizzle-kit'
import { env } from '@/lib/env/server'

export default defineConfig({
	out: './src/db/drizzle',
	schema: './src/db/schema',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
})
