import { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'
import routeGuard from '@/lib/routeGuard'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { signOut } from '@/lib/auth'

const { auth } = NextAuth(authConfig)

/**
 * Keresek elott futo logika
 *
 * @description Authentikacio kezelese es utvonal navigalas
 *
 * @param request A NextRequest objektum
 * @returns A NextResponse objektum
 */
export async function middleware(request: NextRequest) {
	const session = await auth()
	const token = await getToken({ req: request, secret: authConfig.secret })

	//console.log('session', session)
	console.log('middleware token', token)

	if (token) {
		try {
			// Saját API route-on keresztül ellenőrizzük a session-t
			const responseSessionCheck = await fetch(`http://localhost:3000/api/auth/session-check`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: token.sub,
					sessionToken: token.sessionToken,
				}),
			})

			const data = await responseSessionCheck.json()

			if (!data.exists) {
				await apiLogout()
				return null
			}

			/* if (!response.ok) {
				// Ha a session nem létezik, átirányítás kijelentkezési oldalra
				return NextResponse.redirect(new URL('/auth/signout', request.url))
			} */
		} catch (error) {
			console.error('Session ellenőrzési hiba:', error)
			//await signOut({ redirect: false })
			await apiLogout()
			return null
		}
	}

	/**
	 * Utvonal vedelem
	 */
	return routeGuard.all(request, session)
}

/**
 * A middleware csak akkor fut le, ha az URL:
 * - Nem statikus fájl (pl. nem egy képfájl vagy JavaScript/CSS).
 * - Nem Next.js belső fájlokkal kapcsolatos (/_next/).
 * - Viszont minden más URL-re (dinamikus és statikus oldalak, API hívások) végrehajtódik.
 */
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)'],
}

const apiLogout = async (): Promise<void> => {
	await fetch(`http://localhost:3000/api/auth/logout`, {
		method: 'POST',
	})
}
