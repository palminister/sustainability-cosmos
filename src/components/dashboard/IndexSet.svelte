<script>
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

<div class="index-set">
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
				<div class="option">
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
						{option.label || option.value}
					</label>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.index-set {
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
		gap: var(--14px);
		margin: var(--14px) var(--14px) 0 var(--14px);
		flex-wrap: wrap;
		justify-content: center;
	}

	label {
		appearance: none;
		user-select: none;
		/* line-height: 1; */
		/* margin: 0; */
		/* margin-right: var(--20px); */
		padding: 0.6em;
		border-radius: 20px;
		border: 2px solid var(--color-white);
		outline: none;
		cursor: pointer;
		font-family: inherit;
		font-size: var(--14px);
		display: inline-block;
		width: 140px;
		text-align: center;
		opacity: 0.2;
	}

	input[type="radio"] + label {
		color: var(--color-white);
	}

	input[type="radio"]:checked + label,
	input[type="radio"]:checked:hover + label {
		color: var(--color-yellow);
		border: 2px solid var(--color-yellow);
		opacity: 1;
	}

	input[type="radio"]:hover + label {
		/* color: var(--color-purple-light); */
		border-color: var(--color-purple-light);
		opacity: 1;
	}

	input[type="radio"]:focus + label {
		box-shadow: 0 0 4px 0 var(--color-focus);
	}

	input[type="radio"]:disabled + label {
		color: rgb(247, 247, 247);
		background: rgb(247, 247, 247, 0.2);
		opacity: 0.2;
		cursor: not-allowed;
	}
</style>
