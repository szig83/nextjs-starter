import db from '@/db'
import { eq, lt, gte, ne } from 'drizzle-orm'
import { users } from '@/db/schemas'

const usersList = await db.query.users.findMany()

const getUserData = async (id: string) => await db.select().from(users).where(eq(users.id, id))

export { usersList, getUserData }
