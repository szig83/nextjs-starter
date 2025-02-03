import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { authSchema as schema } from './_schema'

export const users = schema.table('users', {
	id: uuid('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: varchar('name'),
	email: varchar('email').unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	password: varchar('password'),
	image: varchar('image'),
})

export default users
