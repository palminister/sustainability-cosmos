<script>
	import {
		formatTableData,
		filterData,
		colorAccessor
	} from "$utils/dataProcessor";
	import { color } from "d3";
	import { fade } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let data;
	export let continent;

	let sort = "SustainabilityIndex";
	let rows = formatTableData(data).sort((a, b) => b[sort] - a[sort]);
	$: filteredRows = filterData("Continent", continent, rows);
	const headers = [
		"Country",
		"HealthIndex",
		"PoliticsIndex",
		"EconomicsIndex",
		"HumanIndex",
		"EnvironmentIndex",
		"SustainabilityIndex"
	];

	const baseToggle = headers.map((d) => {
		return {
			[d]: false
		};
	});
	let toggle = baseToggle;

	const handleSort = (e) => {
		if (sort === e.target.id) {
			rows = rows.reverse();
			toggle[sort] = !toggle[sort];
			return;
		}
		sort = e.target.id;
		toggle = [...baseToggle];
		if (sort === "Country") {
			rows = rows.sort((a, b) =>
				a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0
			);
		} else {
			rows = rows.sort((a, b) => b[sort] - a[sort]);
		}
	};
</script>

<header>
	{#each headers as header}
		{@const isCountry = header === "Country"}
		{@const isSelected = sort === header}
		{@const formatHeader = isCountry ? header : header.slice(0, 3)}
		{@const textAlign = isCountry ? "right" : "center"}
		{@const paddingRight = isCountry ? "5px" : "0"}
		{@const color = isSelected ? "#ffffff" : "#E5FF7B"}
		{@const toggleClass = toggle[sort] ? "arrow-up" : "arrow-down"}
		<div
			id={header}
			on:click={handleSort}
			on:keydown={handleSort}
			class="table-header"
			style="justify-content: {textAlign}; padding-right: {paddingRight}; color: {color};"
		>
			{formatHeader}
			{#if isSelected}
				<span class={toggleClass} />
			{:else}
				<span class="arrow-down" style="opacity: 0.2;" />
			{/if}
		</div>
	{/each}
</header>
{#key filteredRows}
	<article transition:fade={{ duration: 200 }}>
		<section>
			{#each filteredRows as row, index (row.Country)}
				<div class="row" id={row.Country}>
					{#each headers as header}
						<div
							class="cell"
							on:click={(e) => dispatch("click", { e, props: row })}
							on:keydown={(e) => dispatch("click", { e, props: row })}
						>
							{#if header === "Country"}
								<span class="label">{row[header]}</span>
							{:else}
								{@const bgColor = colorAccessor(row, header, "")}
								{@const brighter = color(bgColor).brighter(0.3)}
								{@const darker = color(bgColor).darker(1.5)}
								{@const size = 9 + row[header] * 20}
								<span style="display: none;">{(darker.opacity = 0.3)}</span>
								<div class="bubble-container">
									<div
										class="bubble"
										style="background-color: {bgColor};
										border: 4px solid {brighter}; 
										outline: 10px solid {darker};
										width: {size}px;
										height: {size}px;"
									>
										<!-- {row[header].toFixed(2)} -->
									</div>
									<!-- <span class="bubble-data">{row[header].toFixed(2)}</span> -->
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</section>
	</article>
{/key}

<style>
	article,
	header {
		max-width: 35rem;
		margin: auto;
		color: var(--color-purple-light);
	}
	header {
		/* background-color: rgb(30, 33, 126, 0.1); */
		/* border-bottom: dashed 1px var(--color-purple-light); */
		border-bottom: dashed 1px var(--color-white);
	}
	article {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: 100%;
		margin-top: 5px;
	}

	header,
	section,
	.row {
		display: grid;
		grid-template-columns: 4fr repeat(6, 1fr);
		align-items: center;
		text-align: center;
		width: 100%;
	}

	.row {
		/* padding: 10px 0px 10px 0px; */
		text-align: right;
		scroll-snap-align: start;
		height: 25px;
		border-radius: 4px;
	}
	.row:hover {
		background-color: rgb(30, 33, 126, 0.5);
		/* border-bottom: 1px dashed var(--color-purple-light); */
	}
	.cell {
		cursor: pointer;
		position: relative;
	}
	.label {
		position: absolute;
		right: 15px;
		transform: translateY(-50%);
		font-size: var(--14px);
		/* color: var(--color-white); */
	}

	section {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
		scroll-snap-type: y mandatory;
	}
	section::-webkit-scrollbar {
		display: none;
	}

	.table-header {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: var(--14px);
		font-weight: 600;
		cursor: pointer;
		padding: 10px 0px 10px 0px;
		border-radius: 4px;
	}
	.table-header:hover {
		background-color: rgb(30, 33, 126, 0.5);
	}
	.arrow-up {
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 5px solid var(--color-white);
		margin: 5px;
	}
	.arrow-down {
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid var(--color-white);
		margin: 5px;
	}

	.bubble-container {
		display: flex;
		width: 25px;
		height: 25px;
		/* margin: 0px 10px 0px 0px; */
	}
	.bubble {
		position: relative;
		margin: auto;
		/* width: 30px;
		height: 30px; */
		border-radius: 100%;
		align-items: center;
		justify-content: center;
		z-index: 5;
	}
	.bubble-data {
		position: absolute;
		top: 50%;
		left: 40%;
		z-index: 10;
		transform: translate(-50%, -50%);
		color: var(--color-white);
	}
</style>
