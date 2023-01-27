<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { flipboard } from "$utils/flipboard";
	import tilt from "$utils/tilt.js";

	import Orbit from "$components/dashboard/Orbit.svelte";
	import WGSLogo from "$components/dashboard/WGSLogo.svelte";
	import QuestionMark from "$components/dashboard/QuestionMark.svelte";

	const dispatch = createEventDispatcher();
	let ready = false;
	onMount(() => (ready = true));
</script>

<div class="logo-container">
	<div class="logo">
		<WGSLogo />
		<QuestionMark />
	</div>
</div>
<div class="landing-container" use:tilt={{ max: 1.3 }}>
	<div class="introduction">
		<div class="text-wrapper" use:tilt={{ max: 1.5 }}>
			<h1 class="title">SUSTAINABILITY COSMOS</h1>
			<div class="paragraph">
				{#if ready}
					<p in:flipboard>
						Welcome to the cosmic realm of sustainability, where the stars align
						to reveal the true nature of our world's progress. In this
						interactive dashboard, we invite you to embark on a journey through
						the galaxy of data, where each planet represents a country and its
						position in the constellation reflects multiple things depending on
						the dashboard views. As you navigate through the vast expanse of
						information, you'll discover the secrets of each country's
						performance in terms of Human, Health, Environmental, Economical,
						and Political conditions—all that makeup “Sustainability”.
						Furthermore, this journey will also reveal opportunities for
						improvement and growth toward a more sustainable future. Join us as
						we uncover the mysteries of the Sustainability Cosmos, and gain a
						deeper understanding of the current state of our world.
					</p>
				{/if}
			</div>
			<div class="buttons">
				<button on:click={(e) => dispatch("navigate", { e })}>Guide</button>
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
		overflow: hidden;
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
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
	.logo-container {
		position: absolute;
		animation: fadeIn 1s cubic-bezier(0.47, 0, 0.05, 1);
		z-index: 55;
	}
	.logo {
		display: flex;
		padding: 20px;
		width: 100vw;
		justify-content: space-between;
	}
	.text-wrapper {
		z-index: 10;
		width: 100%;
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
