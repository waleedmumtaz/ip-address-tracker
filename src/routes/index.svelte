<script context="module">
	export async function load({ fetch }) {
		const ipAddressUrl = 'https://api.ipify.org?format=json';
		let myIp = await fetch(ipAddressUrl)
			.then((res) => res.json())
			.then((data) => data.ip);

		const ipDataUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API_KEY}&ipAddress=${myIp}`;
		const res = await fetch(ipDataUrl);
		const data = await res.json();

		if (res.ok) {
			return {
				props: {
					ipData: data
				}
			};
		}
	}
</script>

<script>
	import { IPIFY_API_KEY } from '$lib/Env';
	import Mapbox from '$lib/Mapbox.svelte';

	export let ipData;

	let ipAddress = ipData.ip;
	let location = `${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`;
	let timezone = `UTC ${ipData.location.timezone}`;
	let isp = ipData.isp;
	let lng = ipData.location.lng;
	let lat = ipData.location.lat;
	let loading;

	const setIpAddress = async (e) => {
		loading = true;

		let inputIpAddress = e.target.ip_address.value;
		const ipAddressRegex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;

		if (inputIpAddress.match(ipAddressRegex)) {
			ipAddress = inputIpAddress;
		} else {
			console.error('The IP Address enteres is not valid. Please try again.');
			loading = false;
			return;
		}

		const ipDataUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API_KEY}&ipAddress=${ipAddress}`;
		try {
			const res = await fetch(ipDataUrl);
			const inputIpData = await res.json();

			ipAddress = inputIpData.ip;
			location = `${inputIpData.location.city}, ${inputIpData.location.region}, ${inputIpData.location.country}`;
			timezone = `UTC ${inputIpData.location.timezone}`;
			isp = inputIpData.isp;
			lng = inputIpData.location.lng;
			lat = inputIpData.location.lat;

			loading = false;
		} catch (error) {
			console.error('Error loading data from user', error);
			loading = false;
		}
	};
</script>

<div class="flex flex-1 flex-col">
	<div class="flex flex-1 flex-col text-center">
		<h1 class="py-6 text-3xl font-bold text-white">IP Address Tracker</h1>

		<!-- IP input -->
		<form
			on:submit|preventDefault={setIpAddress}
			class="mb-5 flex w-full items-center justify-center px-5 md:mx-auto md:max-w-lg"
		>
			<input
				name="ip_address"
				type="text"
				placeholder="Search for any IP address or domain"
				class="w-full rounded-l-xl px-6 py-4 placeholder:text-sm focus:outline-none"
			/>
			<button
				class="inline-flex items-center justify-center rounded-r-xl bg-black py-4 pl-4 pr-5 hover:bg-gray-700"
			>
				><img src="/icon-arrow.svg" alt="arrow icon" /></button
			>
		</form>

		{#if loading}
			<div class="mx-5 w-full rounded-xl bg-white py-8 shadow-md md:mx-auto md:max-w-6xl">
				<h2 class="text-3xl">Loading...</h2>
			</div>
		{:else}
			<!-- IP info -->
			<div class="px-5 relative z-10">
				<div
					class="flex flex-col gap-5 rounded-xl bg-white py-8 px-4 md:flex-none shadow-md md:grid md:grid-cols-4 md:divide-x-2 md:text-left md:max-w-6xl md:mx-auto"
				>
					<div class="md:px-10">
						<p class="text-xs font-bold uppercase text-cstm-dark-gray md:mb-3	">IP Address</p>
						<p class="text-xl md:text-xl font-bold">{ipAddress}</p>
					</div>
					<div class="md:px-10">
						<p class="text-xs font-bold uppercase text-cstm-dark-gray md:mb-3	">Location</p>
						<p class="text-xl md:text-xl font-bold">{location}</p>
					</div>
					<div class="md:px-10">
						<p class="text-xs font-bold uppercase text-cstm-dark-gray md:mb-3	">Timezone</p>
						<p class="text-xl md:text-xl font-bold">{timezone}</p>
					</div>
					<div class="md:px-10">
						<p class="text-xs font-bold uppercase text-cstm-dark-gray md:mb-3	">ISP</p>
						<p class="text-xl md:text-xl font-bold">{isp}</p>
					</div>
				</div>
			</div>
			<!-- Map -->
			<div class="flex-1 relative md:-top-28 mt-5 md:mt-0">
				<Mapbox {lng} {lat} />
			</div>
		{/if}
	</div>
</div>
