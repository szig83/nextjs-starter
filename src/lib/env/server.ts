import { ZodError, z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']),
	DB_HOST: z.string(),
	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_NAME: z.string(),
	DB_PORT: z.coerce.number(),
	DATABASE_URL: z.string(),
	DB_MIGRATING: z
		.string()
		.refine((s) => s === 'true' || s === 'false')
		.transform((s) => s === 'true')
		.optional(),
	GOOGLE_CLIENT_ID: z.string().optional(),
	GOOGLE_CLIENT_SECRET: z.string().optional(),
	AUTH_SECRET: z.string().optional(),
})

// Típus generálása a schemából
type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
	try {
		const env = envSchema.parse({
			NODE_ENV: process.env.NODE_ENV,
			DB_HOST: process.env.DB_HOST,
			DB_USER: process.env.DB_USER,
			DB_PASSWORD: process.env.DB_PASSWORD,
			DB_NAME: process.env.DB_NAME,
			DB_PORT: process.env.DB_PORT,
			DATABASE_URL: process.env.DATABASE_URL,
			DB_MIGRATING: process.env.DB_MIGRATING,
			GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
			AUTH_SECRET: process.env.AUTH_SECRET,
		})
		return env
	} catch (error) {
		if (error instanceof ZodError) {
			const issues = error.issues
				.map((issue) => `${issue.path.join('.')}: ${issue.message}`)
				.join('\n')
			throw new Error(`Invalid environment variables:\n${issues}`)
		}
		throw error
	}
}

// Használat
export const env = validateEnv()
