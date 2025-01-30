'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton({
	children,
	redirectTo = '/',
}: Readonly<{ children?: React.ReactNode; redirectTo?: string }>) {
	return <div onClick={() => signOut({ redirectTo })}>{children ?? 'Kilépés'}</div>
}
