import { timestamp, text, uuid } from 'drizzle-orm/pg-core'
import { authSchema as schema } from './_schema'
import { users } from './user'

export const sessions = schema.table('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: uuid('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export default sessions
