import { timestamp, text, primaryKey } from 'drizzle-orm/pg-core'
import { authSchema as schema } from './_schema'

export const verificationTokens = schema.table(
	'verification_tokens',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	(verificationToken) => [
		{
			compositePk: primaryKey({
				columns: [verificationToken.identifier, verificationToken.token],
			}),
		},
	],
)

export default verificationTokens
