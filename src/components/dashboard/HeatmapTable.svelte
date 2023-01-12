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
		"EnvironmentIndex",
		"HumanIndex",
		"SustainabilityIndex"
	];

	const handleSort = (e) => {
		if (sort === e.target.id) {
			rows = rows.reverse();
			return;
		}
		sort = e.target.id;
		if (sort === "Country") {
			rows = rows.sort((a, b) =>
				a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0
			);
		} else {
			rows = rows.sort((a, b) => b[sort] - a[sort]);
		}
	};
</script>

<p>sort by = {sort}</p>

<header>
	{#each headers as header}
		{@const formatHeader = header.replace("Index", "")}
		<button id={header} on:click={handleSort} class="table-header"
			>{formatHeader}</button
		>
	{/each}
</header>
{#key filteredRows}
	<article transition:fade={{ duration: 200 }}>
		<section>
			{#each filteredRows as row, index (row.Country)}
				<div class="row">
					{#each headers as header}
						{@const formatHeader = header.replace("Index", "")}
						<div
							class="cell"
							on:click={(e) => dispatch("click", { e, props: row })}
							on:keydown={(e) => dispatch("click", { e, props: row })}
						>
							{#if header === "Country"}
								<span style="padding-right: 10px;">{row[header]}</span>
							{:else}
								<div class="bubble-container">
									<div
										class="bubble"
										style="background-color: {colorAccessor(
											row,
											'',
											'',
											formatHeader
										)};
										border: 5px solid {color(colorAccessor(row, '', '', formatHeader)).brighter(
											0.8
										)}; 
										outline: 10px solid {color(colorAccessor(row, '', '', formatHeader)).darker(
											3
										)};"
									>
										{row[header].toFixed(2)}
									</div>
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
		max-width: 52rem;
		margin: auto;
		color: var(--color-purple-light);
	}
	article {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: 100%;
	}
	header,
	section,
	.row {
		display: grid;
		grid-template-columns: 2fr repeat(6, 1fr);
		align-items: center;
		text-align: center;
		width: 100%;
	}

	.row {
		margin-top: 10px;
		/* text-align: right; */
	}

	.cell {
		cursor: pointer;
	}

	section {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.table-header {
		font-weight: 600;
	}

	.bubble-container {
		margin: 0px 10px 0px 0px;
	}

	.bubble {
		display: flex;
		margin: auto;
		width: 35px;
		height: 35px;
		/* border-radius: 2px; */
		border-radius: 100%;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.688);
		font-size: 0.6rem;
	}
</style>
