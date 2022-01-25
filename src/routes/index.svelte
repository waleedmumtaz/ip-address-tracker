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
	import { IPIFY_API_KEY, MAPBOX_ACCESS_TOKEN } from '$lib/Env';
	import mapboxgl from 'mapbox-gl';
	import { onMount } from 'svelte';

	export let ipData;

	let ipAddress = ipData.ip;
	let location = `${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`;
	let timezone = `UTC ${ipData.location.timezone}`;
	let isp = ipData.isp;
	let lng = ipData.location.lng;
	let lat = ipData.location.lat;
	let loading;

	mapboxgl.accessToken = `${MAPBOX_ACCESS_TOKEN}`;
	onMount(() => {
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			center: [lng, lat], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});
	});

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

<svelte:head>
	<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div>
	<div class="px-5 text-center">
		<h1 class="py-6 text-3xl text-white">IP Address Tracker</h1>

		<!-- IP input -->
		<form on:submit|preventDefault={setIpAddress} class="mb-5 flex items-center justify-center">
			<input
				name="ip_address"
				type="text"
				placeholder="Search for any IP address or domain"
				class="w-full rounded-l-xl px-6 py-4 placeholder:text-sm focus:outline-none"
			/>
			<button class="inline-flex items-center justify-center rounded-r-xl bg-black py-4 pl-4 pr-5">
				><img src="/icon-arrow.svg" alt="arrow icon" /></button
			>
		</form>

		{#if loading}
			<div class="rounded-xl border-[1px] border-gray-500 bg-white py-8 px-4">
				<h2 class="text-3xl">Loading...</h2>
			</div>
		{:else}
			<!-- IP info -->
			<div class="flex flex-col gap-5 rounded-xl border-[1px] border-gray-500 bg-white py-8 px-4">
				<div>
					<p class="text-xs font-bold uppercase text-cstm-dark-gray">IP Address</p>
					<p class="text-xl font-bold">{ipAddress}</p>
				</div>
				<div>
					<p class="text-xs font-bold uppercase text-cstm-dark-gray">Location</p>
					<p class="text-xl font-bold">{location}</p>
				</div>
				<div>
					<p class="text-xs font-bold uppercase text-cstm-dark-gray">Timezone</p>
					<p class="text-xl font-bold">{timezone}</p>
				</div>
				<div>
					<p class="text-xs font-bold uppercase text-cstm-dark-gray">ISP</p>
					<p class="text-xl font-bold">{isp}</p>
				</div>
			</div>
			<div id="map" class="my-5 h-96 w-full rounded-xl" />
		{/if}
	</div>
</div>
