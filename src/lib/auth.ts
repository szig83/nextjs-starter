import NextAuth, { CredentialsSignin } from 'next-auth'
import { eq } from 'drizzle-orm'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { encode as defaultEncode } from 'next-auth/jwt'
import { v4 as uuid } from 'uuid'
import db from '@/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { accounts, authenticators, sessions, users, verificationTokens } from '@/db/schemas/auth'

import { authConfig } from './auth.config'
import { env } from '@/lib/env/server'

const adapter = DrizzleAdapter(db, {
	accountsTable: accounts,
	usersTable: users,
	authenticatorsTable: authenticators,
	sessionsTable: sessions,
	verificationTokensTable: verificationTokens,
})

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	adapter,
	/*session: {
		strategy: 'database',
	},*/
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
	jwt: {
		encode: async function (params) {
			if (params.token?.credentials) {
				const sessionToken = uuid()

				if (!params.token.sub) {
					throw new Error('No user ID found in token')
				}

				const createdSession = await adapter?.createSession?.({
					sessionToken: sessionToken,
					userId: params.token.sub,
					expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
				})

				if (!createdSession) {
					throw new Error('Failed to create session')
				}

				return sessionToken
			}
			return defaultEncode(params)
		},
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				await db.delete(sessions).where(eq(sessions.userId, token.sub))
				const sessionToken = uuid()
				await db.insert(sessions).values({
					sessionToken,
					userId: user.id,
					expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 nap
				})
				// Session token mentése a JWT-be
				token.sessionToken = sessionToken
			}
			return token
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					//	role: token.role,
					sessionToken: token.sessionToken,
				},
			}
		},
		authorized: async ({ auth, request }) => {
			return !!auth?.user
		},
		signIn: async ({ user, account, profile, email, credentials }) => {
			if (account?.provider === 'google') {
				/**
				 * @TODO ide kell majd hogy ha belépett a Google fiókkal, akkor megnézni, hogy benne van a az adatbázisban és ha nincs akkor beregisztrálni
				 */
			}
			return true
		},
	},
})
