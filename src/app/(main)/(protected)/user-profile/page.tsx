import { auth } from '@/lib/auth'

export default async function UserProfilePage() {
	console.log('UserProfilePage')

	const session = await auth()
	console.log(session)

	return <div>Felhasználó profil oldal</div>
}
