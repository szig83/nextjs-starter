import db from '@/db'

export default async function PageTeszt() {
	const result = await db.query.userGroupMemberships.findMany({
		with: {
			group: true,
			user: true,
		},
	})
	console.log(result)
	return <div>Teszt oldal</div>
}
