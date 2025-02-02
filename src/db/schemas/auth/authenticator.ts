import { boolean, text, primaryKey, integer, uuid } from 'drizzle-orm/pg-core'
import { authSchema as schema } from './_schema'
import { users } from './user'

export const authenticators = schema.table(
	'authenticator',
	{
		credentialID: text('credentialID').notNull().unique(),
		userId: uuid('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		providerAccountId: text('providerAccountId').notNull(),
		credentialPublicKey: text('credentialPublicKey').notNull(),
		counter: integer('counter').notNull(),
		credentialDeviceType: text('credentialDeviceType').notNull(),
		credentialBackedUp: boolean('credentialBackedUp').notNull(),
		transports: text('transports'),
	},
	(authenticator) => [
		{
			compositePK: primaryKey({
				columns: [authenticator.userId, authenticator.credentialID],
			}),
		},
	],
)

export default authenticators
