import { defineConfig } from 'drizzle-kit'
import { env } from '@/lib/env/server'

export default defineConfig({
	out: './src/db/drizzle',
	schema: './src/db/schemas/index.ts',
	dialect: 'postgresql',
	schemaFilter: ['public', 'auth'],
	dbCredentials: {
		url: env.DATABASE_URL,
	},
})
