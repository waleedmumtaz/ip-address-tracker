<script>
	import '../app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>

	<!-- Primary Meta Tags -->
	<title>IP Address Tracker</title>
	<meta name="title" content="IP Address Tracker" />
	<meta name="description" content="IP Address Tracker built with SvelteKit + Tailwind CSS" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ip-address-tracker-blond-ten.vercel.app/" />
	<meta property="og:title" content="IP Address Tracker" />
	<meta
		property="og:description"
		content="IP Address Tracker built with SvelteKit + Tailwind CSS"
	/>
	<meta
		property="og:image"
		content="https://res.cloudinary.com/dev-waleed/image/upload/v1643202766/Frontend%20Mentor/Meta%20Images/023_ip-address-tracker_1200x628.png"
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://ip-address-tracker-blond-ten.vercel.app/" />
	<meta property="twitter:title" content="IP Address Tracker" />
	<meta
		property="twitter:description"
		content="IP Address Tracker built with SvelteKit + Tailwind CSS"
	/>
	<meta
		property="twitter:image"
		content="https://res.cloudinary.com/dev-waleed/image/upload/v1643202766/Frontend%20Mentor/Meta%20Images/023_ip-address-tracker_1200x628.png"
	/>
</svelte:head>

<div
	class="mx-auto flex min-h-screen max-w-7xl flex-col bg-[url('/pattern-bg.png')] bg-top bg-no-repeat font-rubik"
>
	<slot />
</div>
