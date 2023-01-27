<script>
	import { getContext } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import MobileWarning from "$components/helpers/MobileWarning.svelte";
	import Charts from "$components/dashboard/Charts.svelte";
	import Landing from "$components/dashboard/Landing.svelte";
	import { fade } from "svelte/transition";

	// import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	// const data = getContext("data");

	let renderOption = "";
	const handleNavigation = (e) => {
		renderOption = e.detail.e.target.innerText;
	};
	$: isTutorial = renderOption === "Guide";
</script>

<!-- <Demo /> -->
<!-- <Footer /> -->
<div class="home">
	<MobileWarning />
	{#if renderOption === ""}
		<Landing on:navigate={handleNavigation} />
	{:else}
		<div transition:fade>
			<Charts {isTutorial} />
		</div>
	{/if}
</div>

<!-- <Charts /> -->
<style>
	.home {
		/* background: rgba(20, 23, 82, 1); */
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 1) 0%,
			rgba(20, 23, 82, 1) 100%
		);
	}
</style>
