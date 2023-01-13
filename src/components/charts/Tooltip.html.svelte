<script>
	// svelte event created via dispatch
	export let evt = {};
	export let offset = -35;

	let top;
	let left;

	$: if (evt.detail) {
		top = `${evt.detail.e.layerY + offset}px`;
		left = `${evt.detail.e.layerX}px`;
	}
</script>

{#if evt.detail}
	<div class="tooltip" style:top style:left>
		<small>
			<slot detail={evt.detail} />
		</small>
	</div>
{/if}

<style>
	div {
		position: absolute;
		width: auto;
		border: 1px solid var(--color-gray-300);
		background: rgb(16, 17, 39, 0.85);
		color: var(--color-white);
		transform: translate(-50%, -100%);
		padding: 0.5em;
		z-index: var(--z-top);
	}
	/* .tooltip::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 12px;
		height: 12px;
		background: var(--color-white);
		border: 1px solid var(--color-gray-300);
		border-top-color: transparent;
		border-left-color: transparent;
		transform: translate(-50%, 50%) rotate(45deg);
		transform-origin: center center;
	} */
</style>
