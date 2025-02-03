import { timestamp, text, uuid } from 'drizzle-orm/pg-core'
import { authSchema as schema } from './_schema'
import { users } from './users'

export const sessions = schema.table('sessions', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: uuid('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export default sessions
