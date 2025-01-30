import { signInWithSocial } from '@/actions/auth-actions'
import { capitalizeFirstLetter } from '@/lib/common-utils'
import { Button } from '@heroui/react'

export default function SignInSocialButton({
	children,
	provider,
	redirectTo = '/',
}: Readonly<{
	children?: React.ReactNode
	provider: string
	redirectTo?: string
}>) {
	return (
		<form action={signInWithSocial.bind(null, provider, redirectTo)}>
			<Button variant="light" type="submit" size="sm">
				{children ?? `Belépés ${capitalizeFirstLetter(provider)} fiókkal`}
			</Button>
		</form>
	)
}
