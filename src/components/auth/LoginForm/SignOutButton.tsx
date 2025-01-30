import { signOut } from '@/lib/auth'

export default function SignOutButton({
	children,
	redirectTo = '/',
}: Readonly<{
	children?: React.ReactNode
	redirectTo?: string
}>) {
	return (
		<form
			action={async () => {
				'use server'
				await signOut({
					redirectTo,
				})
			}}
		>
			<button>{children ?? 'Kilépés'}</button>
		</form>
	)
}
