import { createEnv } from '@t3-oss/env-nextjs'
import { z, ZodError } from 'zod'

export const env = createEnv({
	client: {
		//NEXT_PUBLIC_PROBA: z.string().min(1),
	},
	onValidationError: (error: ZodError) => {
		console.error('❌ Invalid client environment variables:', error.flatten().fieldErrors)
		process.exit(1)
	},
	runtimeEnv: {
		NEXT_PUBLIC_PROBA: process.env.NEXT_PUBLIC_PROBA,
	},
})
