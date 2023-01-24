<script>
	import Cluster from "$components/dashboard/Cluster.svg.svelte";
	import BeeSwarm from "$components/dashboard/BeeSwarm.svg.svelte";
	import Heatmap from "$components/dashboard/Heatmap.svg.svelte";
	import Telescope from "$components/dashboard/Telescope.svg.svelte";

	export let options = [];
	export let legend = "";
	export let legendPosition = "top";
	export let labelClass = "";
	export let disabled = false;
	export let value = options.length ? options[0].value : "";

	const id = `legend-${Math.floor(Math.random() * 1000000)}`;
	const makeSlug = (str = "") => `${str}`.toLowerCase().replace(/\W/g, "");

	$: optionsWithSlug = options.map((d) => ({
		...d,
		val: d.value,
		slug: makeSlug(d.value)
	}));
	$: isTop = legendPosition === "top";
</script>

<div class="mode-set">
	<div
		id={`group-${id}`}
		class="group"
		class:is-top={isTop}
		role="radiogroup"
		aria-labelledby={`label-${id}`}
	>
		{#if legend}<div class="legend" id="legend-{id}">{legend}</div>{/if}
		<div class="options">
			{#each optionsWithSlug as option}
				<div class={`option-${option.slug}`}>
					<input
						type="radio"
						id={`${id}-${option.slug}`}
						name="name-{id}"
						class="sr-only"
						value={option.value}
						{disabled}
						bind:group={value}
					/>
					<label class="option {labelClass}" for={`${id}-${option.slug}`}>
						<span class="label-icon-container">
							<span class="label-overlay">
								{#if value === option.value}
									<Telescope />
								{/if}
							</span>
							{#if option.value === "Cluster"}
								<Cluster />
							{:else if option.value === "Average"}
								<BeeSwarm />
							{:else}
								<Heatmap />
							{/if}
						</span>
						{#if option.value === "Heatmap"}
							{"Summary"}
						{:else}
							{option.label || option.value}
						{/if}
					</label>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.mode-set {
		display: inline-block;
		margin-bottom: 4px;
	}

	.group {
		display: flex;
		align-items: center;
	}

	.group.is-top {
		flex-direction: column;
	}

	.is-top .legend {
		padding-bottom: 0.5em;
		padding-right: 0;
	}

	.legend {
		padding-right: 0.5em;
		font-size: 1em;
	}

	.options {
		display: flex;
		flex-direction: column;
	}

	label {
		appearance: none;
		user-select: none;
		line-height: 1;
		margin: 0;
		padding: 0.5em;
		border-radius: 0;
		outline: none;
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
		font-family: inherit;
		font-size: var(--14px);
		display: inline-block;
		text-align: center;
	}

	.label-icon-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 96px;
		height: 96px;
		margin-bottom: var(--12px);
	}

	.label-overlay {
		position: absolute;
	}

	input[type="radio"] + label {
		color: var(--color-white);
	}

	input[type="radio"]:checked + label,
	input[type="radio"]:checked:hover + label {
		color: var(--color-yellow);
		font-weight: 700;
	}
	input[type="radio"]:hover + label {
		color: var(--color-white);
		text-decoration: underline 2px;
		text-decoration-color: var(--color-purple-light);
		text-underline-offset: 5px;
	}

	input[type="radio"]:disabled + label {
		color: var(--color-gray-700);
		cursor: not-allowed;
	}
</style>
