//'use client'

//import { usersList, getUserData } from '@/db/queries/users'

export default async function Home() {
	//const x = await getUserData('6ac8b3ad-5c5a-458a-8db6-91822c38ae54')
	//console.log(x[0])

	return (
		<div>
			<h1>Főoldal</h1>
			<ul>
				{/*usersList.map((user) => (
					<li key={user.id}>
						{user.name} ({user.email})
					</li>
				))*/}
			</ul>
		</div>
	)
}
