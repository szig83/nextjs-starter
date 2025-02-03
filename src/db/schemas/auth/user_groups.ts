import { timestamp, varchar, uuid } from 'drizzle-orm/pg-core'
import { authSchema as schema } from './_schema'

export const userGroups = schema.table('user_groups', {
	id: uuid('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: varchar('name'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
})
