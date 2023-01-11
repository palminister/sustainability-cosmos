<script>
	import { LayerCake, Svg, Html } from "layercake";
	import { mean, deviation } from "d3";
	import {
		viewOptions,
		indexOptions,
		continentOptions,
		colorOptions,
		sizeOptions,
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

	let selectedView = viewOptions[0].value;
	let selectedIndex = indexOptions[0].value;
	let selectedContinent = continentOptions[0].value;
	let selectedColor = colorOptions[0].value;
	let selectedColorIndex = indexOptions[0].value;
	let selectedSize = sizeOptions[0].value;
	let selectedSizeIndex = indexOptions[0].value;
	let selectedSizeFeature = indexOptions[0].value;

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

	let data = formatSNEData(
		selectedIndex,
		selectedColor,
		selectedColorIndex,
		selectedSize,
		selectedSizeIndex,
		worldData
	);
	let [meanValue, stdValue] = [null, null];

	$: if (selectedView === "Cluster") {
		data = formatSNEData(
			selectedIndex,
			selectedColor,
			selectedColorIndex,
			selectedSize,
			selectedSizeIndex,
			worldData
		);
		[x, y] = ["SNE_X", "SNE_Y"];
		[meanValue, stdValue] = [null, null];
	} else if (selectedView === "BeeSwarm") {
		let beeSwarmData = formatBeeSwarmData(
			selectedIndex,
			selectedColor,
			selectedColorIndex,
			selectedSize,
			selectedSizeIndex,
			worldData
		);
		data = filterData("Continent", selectedContinent, beeSwarmData);
		[x, y] = ["BeeSwarmX", "BeeSwarmY"];
		[meanValue, stdValue] = [
			mean(data, (d) => d[y]),
			deviation(data, (d) => d[y])
		];
	} else {
		data = null;
	}
	$: console.log("data", data);
</script>

<section>
	<h2>Force scatterplot</h2>
	<ButtonSet
		legend={"Choose"}
		options={viewOptions}
		bind:value={selectedView}
	/>
	<Select
		label={"Select index"}
		options={indexOptions}
		bind:value={selectedIndex}
	/>
	<Select
		label={"Select color"}
		options={colorOptions}
		bind:value={selectedColor}
	/>
	<Select
		label={"Select size"}
		options={sizeOptions}
		bind:value={selectedSize}
	/>
	{#if selectedColor === "Index"}
		<Select
			label={"Select color index"}
			options={indexOptions}
			bind:value={selectedColorIndex}
		/>
	{/if}
	{#if selectedSize === "Index"}
		<Select
			label={"Select size index"}
			options={indexOptions}
			bind:value={selectedSizeIndex}
		/>
	{/if}
	{#if selectedView === "BeeSwarm"}
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
