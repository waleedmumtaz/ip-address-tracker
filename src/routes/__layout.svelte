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
</svelte:head>

<div class="min-h-screen bg-[url('/pattern-bg.png')] bg-no-repeat bg-top font-rubik">
	<slot />
</div>
