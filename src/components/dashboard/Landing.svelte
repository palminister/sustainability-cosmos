<script>
	import Orbit from "$components/dashboard/Orbit.svelte";
	import { fade } from "svelte/transition";
	import { flipboard } from "$utils/flipboard";
	import tilt from "$utils/tilt.js";
	import { createEventDispatcher, onMount } from "svelte";
	const dispatch = createEventDispatcher();
	let ready = false;
	onMount(() => (ready = true));
</script>

<div class="landing-container" use:tilt={{ max: 1.5 }}>
	<div class="introduction">
		<div class="text-wrapper" use:tilt={{ max: 1.5 }}>
			<h1 class="title">WORLD CONSTELLATIONS</h1>
			<div class="paragraph">
				{#if ready}
					<p in:flipboard>
						In our world, there is a plethora of data which come from part of
						human behavior e.g. Gross Domestic Product (GDP), Healthcare
						Expenditure or CO2 emission. Notwithstanding, it is likely hard to
						see a tangible fact because of how large of data is now. This
						dashboard provide 6 factors to evaluate how a member of our world is
						now: Economic, Environment, Health, Human, Politic and
						Sustainability which the last one is combined from the first 5
						factors
					</p>
				{/if}
			</div>
			<div class="buttons">
				<button on:click={(e) => dispatch("navigate", { e })}>Tutorial</button>
				<button on:click={(e) => dispatch("navigate", { e })}>Explore</button>
			</div>
		</div>
	</div>
	{#if ready}
		<div in:fade={{ duration: 2000 }}>
			<Orbit />
		</div>
	{/if}
</div>

<style>
	.landing-container {
		width: 100vw;
		height: 100vh;
		color: var(--color-white);
		background: rgb(16, 17, 39, 1);
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 1) 0%,
			rgba(22, 27, 118, 1) 100%
		);
		animation: fadeIn 1s cubic-bezier(0.47, 0, 0.05, 1);
	}
	.introduction {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
	.text-wrapper {
		z-index: 10;
		max-width: 800px;
	}
	.title {
		color: var(--color-yellow);
		font-weight: 700;
		text-align: center;
	}
	.paragraph {
		font-size: var(--12px);
		letter-spacing: 1px;
		line-height: 1.6;
		padding: 20px;
		background: linear-gradient(
			0deg,
			rgba(20, 20, 49, 0.6) 0%,
			rgba(19, 25, 121, 0.6) 100%
		);
		border: 1px solid var(--color-purple-light);
		border-radius: 8px;
		margin-bottom: 20px;
	}
	.buttons {
		display: flex;
		justify-content: center;
		gap: var(--14px);
	}
	button {
		font-family: "Orbitron", sans-serif;
		padding: 10px 0px;
		font-size: var(--13px);
		letter-spacing: 1px;
		color: var(--color-yellow);
		width: 140px;
		border: 2px solid var(--color-yellow);
		border-radius: 20px;
		background: rgba(20, 20, 49, 0.85);
	}
	button:hover {
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
		color: var(--color-white);
		background: rgba(20, 23, 84, 0.85);
	}
</style>
