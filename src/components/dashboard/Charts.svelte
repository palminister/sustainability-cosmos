<script>
	import { LayerCake, Svg, Html } from "layercake";
	import { mean, deviation } from "d3";
	import {
		viewOptions,
		indexOptions,
		continentOptions,
		colorOptions,
		sizeOptions,
		sizeFeatureOptions,
		filterData,
		formatSNEData,
		formatBeeSwarmData
	} from "$utils/dataProcessor";

	import worldData from "$components/dashboard/world_data_imputed.csv";
	import Svelecte from "../../../node_modules/svelecte/src/Svelecte.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import AxisX from "$components/charts/AxisX.svg.svelte";
	import AxisY from "$components/charts/AxisY.svg.svelte";
	import ScatterForce from "$components/dashboard/ScatterForce.svelte";
	import Tooltip from "$components/charts/Tooltip.html.svelte";
	import Deviation from "$components/charts/Deviation.svg.svelte";
	import HeatmapTable from "$components/dashboard/HeatmapTable.svelte";

	let selectedView = viewOptions[0].value;
	let selectedIndex = indexOptions[0].value;
	let selectedContinent = continentOptions[0].value;
	let selectedColor = colorOptions[0].value;
	let selectedColorIndex = indexOptions[0].value;
	let selectedSize = sizeOptions[0].value;
	let selectedSizeIndex = indexOptions[0].value;
	let selectedSizeFeature = "Economic Growth";

	let evt;
	let hideTooltip = true;

	let [x, y] = ["SNE_X", "SNE_Y"];
	const p = 25;
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
		selectedSizeFeature,
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
			selectedSizeFeature,
			worldData
		);
		[x, y] = ["SNE_X", "SNE_Y"];
		[meanValue, stdValue] = [null, null];
	}
	$: if (selectedView === "BeeSwarm") {
		let beeSwarmData = formatBeeSwarmData(
			selectedIndex,
			selectedColor,
			selectedColorIndex,
			selectedSize,
			selectedSizeIndex,
			selectedSizeFeature,
			worldData
		);
		data = filterData("Continent", selectedContinent, beeSwarmData);
		[x, y] = ["BeeSwarmX", "BeeSwarmY"];
		[meanValue, stdValue] = [
			mean(data, (d) => d[y]),
			deviation(data, (d) => d[y])
		];
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
	<p>Select index</p>
	<Svelecte
		labelField="value"
		options={indexOptions}
		bind:value={selectedIndex}
	/>
	<p>Select color</p>
	<Svelecte
		labelField="value"
		options={colorOptions}
		bind:value={selectedColor}
	/>
	{#if selectedColor === "Index"}
		<p>Select color index</p>
		<Svelecte
			labelField="value"
			options={indexOptions}
			bind:value={selectedColorIndex}
		/>
	{/if}
	<p>Select size</p>
	<Svelecte
		labelField="value"
		options={sizeOptions}
		bind:value={selectedSize}
	/>
	{#if selectedSize === "Index"}
		<p>Select size index</p>
		<Svelecte
			labelField="value"
			options={indexOptions}
			bind:value={selectedSizeIndex}
		/>
	{/if}
	{#if selectedSize === "Feature"}
		<p>Select Feature</p>
		<Svelecte
			groupLabelField="groupHeader"
			groupItemsField="items"
			labelField="value"
			options={sizeFeatureOptions}
			bind:value={selectedSizeFeature}
		/>
	{/if}
	{#if selectedView === "BeeSwarm" || selectedView === "Heatmap"}
		<p>Select region</p>
		<Svelecte
			labelField="value"
			options={continentOptions}
			bind:value={selectedContinent}
		/>
	{/if}

	<figure>
		{#if selectedView === "Heatmap"}
			<HeatmapTable
				on:click={(event) => console.log("click", event.detail.props)}
				data={worldData}
				continent={selectedContinent}
			/>
		{:else}
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
		{/if}
	</figure>
</section>

<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 80vh;
		background-color: #101127;
	}
</style>
