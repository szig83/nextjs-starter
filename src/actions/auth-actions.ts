'use server'

import { signIn } from '@/lib/auth'

export async function signInWithCredentials(formData: FormData) {
	return signIn('credentials', formData)
}

export async function signInWithSocial(provider: string, redirectTo: string) {
	console.log('signInWithSocial', provider, redirectTo)
	await signIn(provider, { redirectTo })
}
