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

<div class="button-set">
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
						<span class="checkmark" />
						{option.label || option.value}
					</label>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.button-set {
		display: inline-block;
		margin-bottom: 4px;
		width: 100%;
	}

	.group {
		display: flex;
		/* align-items: center; */
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
		align-items: flex-start;
	}

	.option {
		display: flex;
		align-items: center;
	}

	.checkmark {
		height: 18px;
		width: 18px;
		margin-right: 10px;
		border: 1px solid var(--color-purple-light);
		border-radius: 50%;
	}

	label {
		appearance: none;
		user-select: none;
		line-height: 1;
		margin: 0;
		padding: 0.4em;
		border-radius: 0;
		color: var(--color-yellow);
		outline: none;
		cursor: pointer;
		font-family: inherit;
		font-size: var(--12px);
		display: inline-block;
	}

	.checkmark:after {
		content: "";
		position: absolute;
		height: 15px;
		width: 15px;
		border-radius: 50%;
		transform: translate(0.5px, 0.5px);
		background: rgb(16, 17, 39);
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 0) 0%,
			rgba(255, 255, 255, 1) 100%
		);
		display: none;
	}

	input[type="radio"]:checked + label .checkmark:after {
		display: block;
	}

	input[type="radio"]:disabled + label {
		color: var(--color-gray-700);
		background: var(--color-gray-500);
		cursor: not-allowed;
	}
</style>
