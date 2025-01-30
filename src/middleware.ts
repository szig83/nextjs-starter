import type { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'
import routeGuard from '@/lib/routeGuard'

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
