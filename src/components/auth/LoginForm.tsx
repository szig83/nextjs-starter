'use client'

import { signInWithCredentials } from '@/actions/auth-actions'
import SignInSocialButton from './LoginForm/SignInSocialButton'
import SignInCredentialButton from './LoginForm/SignInCredentialButton'
import { Input, Divider } from '@heroui/react'
import { FaGoogle } from 'react-icons/fa'

export default function LoginForm() {
	return (
		<>
			<form action={signInWithCredentials}>
				<div className="flex flex-col gap-2">
					<Input label="E-mail" type="email" />
					<Input label="Jelszó" type="password" />
					<SignInCredentialButton />
				</div>
			</form>
			<Divider />
			<div className="text-center">
				<SignInSocialButton provider="google">
					<FaGoogle />
					Belépés Google fiókkal
				</SignInSocialButton>
			</div>
		</>
	)
}
