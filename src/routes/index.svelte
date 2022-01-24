<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API_KEY}&ipAddress=8.8.8.8`
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
	import { IPIFY_API_KEY } from '$lib/Env';

	export let ipData;

	let ipAddress = ipData.ip;
	let location = `${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`;
	let timezone = `UTC ${ipData.location.timezone}`;
	let isp = ipData.isp;
</script>

<div>
	<div class="text-center px-5">
		<h1 class="text-white text-3xl py-6">IP Address Tracker</h1>

		<!-- IP input -->
		<div class="flex justify-center items-center mb-5">
			<input
				name="ip-address"
				type="text"
				placeholder="Search for any IP address or domain"
				class="px-6 py-4 w-full rounded-l-xl placeholder:text-sm focus:outline-none"
			/>
			<button class="bg-black rounded-r-xl inline-flex justify-center items-center py-4 pl-4 pr-5">
				><img src="/icon-arrow.svg" alt="arrow icon" /></button
			>
		</div>

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
	</div>
</div>
