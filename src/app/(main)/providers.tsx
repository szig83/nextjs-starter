// app/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { HeroUIProvider } from '@heroui/react'

export function Providers({
	children,
	session,
}: {
	children: React.ReactNode
	session: Session | null
}) {
	return (
		<SessionProvider session={session}>
			<HeroUIProvider>{children}</HeroUIProvider>
		</SessionProvider>
	)
}
