// app/api/check-session/route.ts
import db from '@/db'
//import { sessions } from '@/db/schemas'
import { eq } from 'drizzle-orm'

// app/auth/signout/route.ts vagy egy signout handler
import { auth, signOut } from '@/lib/auth'

import { sessions } from '@/db/schemas'
import { revalidatePath } from 'next/cache'

export async function POST() {
	console.log('logout')
	const session = await auth()

	if (session) {
		// Session törlése az adatbázisból
		await db.delete(sessions).where(eq(sessions.userId, session.user?.id))
	}

	// Standard NextAuth kijelentkezési folyamat
	//revalidatePath('/')
	await signOut({ redirect: false })

	return new Response(null, { status: 200 })
}
