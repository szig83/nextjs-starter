// app/api/check-session/route.ts
import db from '@/db'
//import { sessions } from '@/db/schemas'
import { gte, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const body = await request.json()

	const { userId, sessionToken } = body

	if (!userId || !sessionToken) {
		return NextResponse.json({ error: 'User ID and session token are required' }, { status: 400 })
	}

	try {
		const existingSession = await db.query.sessions.findFirst({
			where: (sessions, { eq }) =>
				eq(sessions.userId, userId) &&
				eq(sessions.sessionToken, sessionToken) &&
				gte(sessions.expires, new Date()),
		})

		if (!existingSession) {
			return NextResponse.json({ exists: false }, { status: 404 })
		}

		return NextResponse.json({ exists: true })
	} catch (error) {
		console.error('Session ellenőrzési hiba:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
