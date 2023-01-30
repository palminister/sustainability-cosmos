<script>
	export let color;
	export let options = [];
	export let isIndex = false;
</script>

<div class="color-set">
	{#if options.length > 1}
		{#each options as option}
			{@const id = option.value}
			{#if !id.includes("All")}
				<div
					data-value={id}
					class="option"
					style="background: {isIndex
						? `linear-gradient(90deg,${color[id + 'Index'].startColor} 0%, ${
								color[id + 'Index'].endColor
						  } 50%, white 100%)`
						: `${color[id]}`}; margin-right: 0.5px;"
				>
					<span class="label" data-value={id}>{id}</span>
				</div>
			{/if}
		{/each}
	{:else}
		{@const id = options[0].replace(" ", "")}
		{@const idLabel = options[0]}
		<div
			data-value={id}
			class="option"
			style="background: linear-gradient(90deg,{color[id]
				.startColor} 0%, {color[id].endColor} 50%, white 100%);"
		>
			<span class="label" data-value={id}>{idLabel}</span>
			<div class="label-number-wrapper">
				<span class="label-number">
					<span data-value={id}>0.0</span>
					<span data-value={id}>1.0</span>
				</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.color-set {
		display: flex;
		width: 100%;
		font-size: var(--12px);
		color: var(--color-white);
		text-align: center;
	}
	.option {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		transition: all 0.3s cubic-bezier(0.47, 0, 0.05, 1);
	}
	.label {
		transform: translateY(-140%);
	}
	.label-number-wrapper {
		position: absolute;
		width: 100%;
	}
	.label-number {
		display: flex;
		justify-content: space-between;
		transform: translateY(-140%);
		padding: 0 1rem 0 1rem;
	}
</style>
