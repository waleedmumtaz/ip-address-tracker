<script context="module">
	export async function load({ fetch }) {
		let myIp = await fetch('https://api.ipify.org?format=json')
			.then((res) => res.json())
			.then((data) => data.ip);

		const res = await fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API_KEY}&ipAddress=${myIp}`
		);
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

	mapboxgl.accessToken = `${MAPBOX_ACCESS_TOKEN}`;
	onMount(() => {
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			// center: [-74.5, 40], // starting position [lng, lat]
			center: [lng, lat], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});
	});

	const setIpAddress = (e) => {
		// check if ip address is valid
		let ipAddress = e.target.ip_address.value;
		const ipAddressRegex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;
		if (ipAddress.match(ipAddressRegex)) {
			console.log('valid ip address');
		} else {
			console.log('invalid ip address');
		}
	};
</script>

<svelte:head>
	<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div>
	<div class="text-center px-5">
		<h1 class="text-white text-3xl py-6">IP Address Tracker</h1>

		<!-- IP input -->
		<form on:submit|preventDefault={setIpAddress} class="flex justify-center items-center mb-5">
			<input
				name="ip_address"
				type="text"
				placeholder="Search for any IP address or domain"
				class="px-6 py-4 w-full rounded-l-xl placeholder:text-sm focus:outline-none"
			/>
			<button class="bg-black rounded-r-xl inline-flex justify-center items-center py-4 pl-4 pr-5">
				><img src="/icon-arrow.svg" alt="arrow icon" /></button
			>
		</form>

		<!-- IP info -->
		<div class="bg-white rounded-xl py-8 flex flex-col gap-5 border-[1px] border-gray-500">
			<div>
				<p class="uppercase text-cstm-dark-gray font-bold text-xs">IP Address</p>
				<p class="font-bold text-xl">{ipAddress}</p>
			</div>
			<div>
				<p class="uppercase text-cstm-dark-gray font-bold text-xs">Location</p>
				<p class="font-bold text-xl">{location}</p>
			</div>
			<div>
				<p class="uppercase text-cstm-dark-gray font-bold text-xs">Timezone</p>
				<p class="font-bold text-xl">{timezone}</p>
			</div>
			<div>
				<p class="uppercase text-cstm-dark-gray font-bold text-xs">ISP</p>
				<p class="font-bold text-xl">{isp}</p>
			</div>
		</div>
		<div id="map" class="w-full h-96 rounded-xl my-5" />
	</div>
</div>
