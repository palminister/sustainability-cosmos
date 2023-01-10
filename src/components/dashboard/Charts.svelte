<script>
	import { LayerCake, Svg, Html } from "layercake";
	import { mean, deviation } from "d3";
	import {
		indexOptions,
		continentOptions,
		filterData,
		formatSNEData,
		formatBeeSwarmData
	} from "$utils/dataProcessor";

	import worldData from "$components/dashboard/world_data_imputed.csv";
	import Select from "$components/helpers/Select.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import AxisX from "$components/charts/AxisX.svg.svelte";
	import AxisY from "$components/charts/AxisY.svg.svelte";
	import ScatterForce from "$components/dashboard/ScatterForce.svelte";
	import Tooltip from "$components/charts/Tooltip.html.svelte";
	import Deviation from "$components/charts/Deviation.svg.svelte";

	const buttonSetOptions = [{ value: "Cluster" }, { value: "BeeSwarm" }];
	let selectedIndex = indexOptions[0].value;
	let selectedContinent = continentOptions[0].value;
	let selectedButtonSet = buttonSetOptions[0].value;

	let evt;
	let hideTooltip = true;

	let [x, y] = ["SNE_X", "SNE_Y"];
	const p = 20;
	const padding = {
		top: p,
		left: p,
		bottom: p,
		right: p
	};

	let data = formatSNEData(selectedIndex, worldData);
	let meanValue = null;
	let stdValue = null;

	$: if (selectedButtonSet === "Cluster") {
		data = formatSNEData(selectedIndex, worldData);
		[x, y] = ["SNE_X", "SNE_Y"];
		meanValue = null;
		stdValue = null;
	} else if (selectedButtonSet === "BeeSwarm") {
		let beeSwarmData = formatBeeSwarmData(selectedIndex, worldData);
		data = filterData("Continent", selectedContinent, beeSwarmData);
		[x, y] = ["BeeSwarmX", "BeeSwarmY"];
		meanValue = mean(data, (d) => d[y]);
		stdValue = deviation(data, (d) => d[y]);
	} else {
		data = null;
	}
</script>

<section>
	<h2>Force scatterplot</h2>
	<ButtonSet
		legend={"Choose"}
		options={buttonSetOptions}
		bind:value={selectedButtonSet}
	/>
	{#if selectedButtonSet === "Cluster"}
		<Select
			label={"Select something"}
			options={indexOptions}
			bind:value={selectedIndex}
		/>
	{/if}
	{#if selectedButtonSet === "BeeSwarm"}
		<Select
			label={"Select something"}
			options={indexOptions}
			bind:value={selectedIndex}
		/>
		<Select
			label={"Select region"}
			options={continentOptions}
			bind:value={selectedContinent}
		/>
	{/if}

	<figure>
		<LayerCake {data} {x} {y} {padding}>
			<Svg>
				<AxisX />
				<AxisY />
				{#if stdValue}
					<Deviation {meanValue} {stdValue} />
				{/if}
				<ScatterForce
					on:mousemove={(event) => {
						evt = hideTooltip = event;
					}}
					on:mouseout={() => (hideTooltip = true)}
					on:click={(event) => console.log("click", event.detail.props)}
					strokeWidth="1"
				/>
			</Svg>
			<Html pointerEvents={false}>
				{#if hideTooltip !== true}
					<Tooltip {evt} let:detail>
						{#each Object.entries(detail.props) as [key, value]}
							{#if key === "Country"}
								<div class="row"><span>{key}:</span> {value}</div>
							{/if}
						{/each}
					</Tooltip>
				{/if}
			</Html>
		</LayerCake>
	</figure>
</section>

<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 80vh;
	}
</style>
