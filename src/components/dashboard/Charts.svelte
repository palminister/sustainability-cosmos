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
	<div class="setting-panel">
		<div class="setting-content">
			<h3 class="panel-label">Choose the Telescope</h3>
			<ButtonSet
				legend={"Choose"}
				options={viewOptions}
				bind:value={selectedView}
			/>
			<h3 class="panel-label">Configure the Settings</h3>
			<p class="select-label">Select index</p>
			<Svelecte
				labelField="value"
				options={indexOptions}
				bind:value={selectedIndex}
			/>
			<div class="row">
				<div class="column">
					<p class="select-label">Select color</p>
					<Svelecte
						labelField="value"
						options={colorOptions}
						bind:value={selectedColor}
					/>
				</div>
				{#if selectedColor === "Index"}
					<div class="column" style="margin-left: 7px;">
						<p class="select-label">Select color index</p>
						<Svelecte
							labelField="value"
							options={indexOptions}
							bind:value={selectedColorIndex}
						/>
					</div>
				{/if}
			</div>
			<p class="select-label">Select size</p>
			<Svelecte
				labelField="value"
				options={sizeOptions}
				bind:value={selectedSize}
			/>
			{#if selectedSize === "Index"}
				<p class="select-label">Select size index</p>
				<Svelecte
					labelField="value"
					options={indexOptions}
					bind:value={selectedSizeIndex}
				/>
			{/if}
			{#if selectedSize === "Feature"}
				<p class="select-label">Select Feature</p>
				<Svelecte
					groupLabelField="groupHeader"
					groupItemsField="items"
					labelField="value"
					options={sizeFeatureOptions}
					bind:value={selectedSizeFeature}
				/>
			{/if}
			{#if selectedView === "BeeSwarm" || selectedView === "Heatmap"}
				<p class="select-label">Select region</p>
				<Svelecte
					labelField="value"
					options={continentOptions}
					bind:value={selectedContinent}
				/>
			{/if}
		</div>
	</div>

	<div class="chart">
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
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
	}
	.setting-panel {
		display: flex;
		flex-direction: column;
		width: 447px;
		padding: 2.5rem;
		background: rgb(16, 17, 39);
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 1) 0%,
			rgba(27, 30, 128, 1) 100%
		);
	}
	.setting-content {
		width: 100%;
		height: 100%;
	}
	.panel-label {
		color: var(--color-white);
	}
	.column {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.row {
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	.select-label {
		color: var(--color-white);
		font-size: 16px;
		margin: 25px 0 10px 0;
	}
	.chart {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		background: rgb(16, 17, 39);
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 1) 0%,
			rgba(20, 23, 84, 1) 100%
		);
	}
	figure {
		margin: 1rem auto;
		width: 90%;
		height: 80vh;
	}
</style>
