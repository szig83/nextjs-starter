import type { NextAuthConfig } from 'next-auth'
import { accounts, authenticators, sessions, users, verificationTokens } from '@/db/schemas/auth'
import db from '@/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { env } from './env/server'
/*
const adapter = DrizzleAdapter(db, {
	accountsTable: accounts,
	usersTable: users,
	authenticatorsTable: authenticators,
	sessionsTable: sessions,
	verificationTokensTable: verificationTokens,
})
*/
export const authConfig: NextAuthConfig = {
	session: {
		strategy: 'jwt',
	},
	providers: [],
	secret: env.AUTH_SECRET,
}
