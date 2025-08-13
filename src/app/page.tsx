import Link from "next/link";

export default function Home() {
	return (
		<main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
			<h1>Welcome to Hangout Slots</h1>
			<Link href="/create" style={{ marginTop: 24, fontSize: 20, color: '#0070f3', textDecoration: 'underline' }}>
				Create a New Event
			</Link>
		</main>
	);
}



