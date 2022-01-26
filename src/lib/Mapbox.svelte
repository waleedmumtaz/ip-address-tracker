<script>
	import { MAPBOX_ACCESS_TOKEN } from '$lib/Env';
	import mapboxgl from 'mapbox-gl';
	import { onMount } from 'svelte';

	export let lng, lat;

	mapboxgl.accessToken = `${MAPBOX_ACCESS_TOKEN}`;
	onMount(() => {
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			center: [lng, lat], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});

		const marker = new mapboxgl.Marker({
			color: '#000000'
		})
			.setLngLat([lng, lat])
			.addTo(map);
	});
</script>

<svelte:head>
	<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div id="map" class="h-full w-full" />

<style>
	#map {
		position: absolute;
		top: 0;
		bottom: 0;
	}
</style>
