<script>
	let innerWidth = 1024;
	let innerHeight = 600;
	$: isDesktop = innerWidth >= 1024 && innerHeight >= 600;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if !isDesktop}
	<div>
		🚧 This project is optimized for viewing on a desktop device. For the best
		experience, we recommend using a computer or laptop. 🚧
	</div>
{/if}

<style>
	div {
		position: fixed;
		z-index: 999999999;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		padding: 1.25em;
		background: var(--color-yellow);
		color: var(--color-purple-dark);
		font-family: monospace;
		font-size: 16px;
		animation: fadeIn 0.5s cubic-bezier(0.47, 0, 0.05, 1);
	}
</style>
