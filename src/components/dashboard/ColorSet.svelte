<script>
	export let color;
	export let options = [];
	export let value = options.length ? options[0].value : "";

	const handleClick = (e) => {
		let data = e.target.dataset.value;
		if (data) {
			value = data;
		}
	};
</script>

<div class="color-set" on:click={handleClick} on:keydown={handleClick}>
	{#each options as option}
		{@const id = option.value}
		{@const isAll = id === "All"}
		<div
			data-value={id}
			class="option"
			style="background-color: {color[id]}; 
            width: {value === 'All' && isAll ? 0 : 100}%;
            opacity: {id === value || isAll || value === 'All' ? 1 : 0.4};"
		>
			{#if isAll}
				<span
					class="clear"
					style="opacity: {value === 'All' ? 0 : 1};"
					data-value={id}
				>
					<span data-value={id} class="clear-text"> Clear </span>
				</span>
			{:else}
				<span class="label" data-value={id}>{id}</span>
			{/if}
		</div>
	{/each}
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
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
		transition: all 0.3s cubic-bezier(0.47, 0, 0.05, 1);
	}
	.clear {
		position: relative;
		height: 16.8px;
		border: 1px solid var(--color-yellow);
		overflow: hidden;
	}
	.clear-text {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.label {
		transform: translateY(-140%);
	}
</style>
