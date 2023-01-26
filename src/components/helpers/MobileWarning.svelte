<script>
	let innerWidth = 1024;
	let innerHeight = 600;
	let close = false;
	$: isDesktop = innerWidth >= 1024 && innerHeight >= 600;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if !isDesktop && !close}
	<div class="warning-container">
		<div class="warning-prompt">
			🚧 This project is optimized for viewing on a desktop device. For the best
			experience, we recommend using a computer or laptop. <button
				on:click={() => {
					close = true;
				}}>continue anyway</button
			>🚧
		</div>
	</div>
{/if}

<style>
	.warning-container {
		position: fixed;
		z-index: 999999999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.warning-prompt {
		padding: 1.25em;
		text-align: center;
		background: var(--color-yellow);
		color: var(--color-purple-dark);
		font-family: monospace;
		font-size: var(--14px);
		animation: fadeIn 0.5s cubic-bezier(0.47, 0, 0.05, 1);
	}
	button {
		padding: 0;
		background: none;
		font-family: monospace;
		text-decoration: underline;
		opacity: 0.5;
		margin-right: 8px;
	}
</style>
