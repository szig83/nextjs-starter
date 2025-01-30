'use server'

import { signIn } from '@/lib/auth'

export async function socialSignIn(provider: string, redirectTo: string) {
	await signIn(provider, { redirectTo })
}
