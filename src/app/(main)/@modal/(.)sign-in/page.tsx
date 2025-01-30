import Modal from '@/components/modal'
import LoginForm from '@/components/auth/LoginForm'

export default async function LoginFormModal() {
	console.log('LoginFormModal')
	return (
		<Modal modalTitle="Bejelentkezés">
			<LoginForm />
		</Modal>
	)
}
