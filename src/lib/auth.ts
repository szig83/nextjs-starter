import NextAuth, { CredentialsSignin } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

import { authConfig } from './auth.config'
import { env } from '@/lib/env/server'

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	pages: {
		signIn: '/sign-in',
		//signOut: '/auth/sign-out',
	},
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'Please enter your email' },
				password: { label: 'Password', type: 'password', placeholder: '***********' },
			},
			async authorize(credentials) {
				const { email, password } = credentials

				if (email === 'valami@valami.hu' && password === '12345') {
					return {
						id: '1',
						name: 'Valami',
						email: 'valami@valami.hu',
					}
				}

				throw new CredentialsSignin('Invalid credentials.')
			},
		}),
		Google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
})
