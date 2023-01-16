<script>
	import { LayerCake, Svg, Html } from "layercake";
	import { mean, deviation } from "d3";
	import {
		viewOptions,
		indexOptions,
		countryOptions,
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
	import ModeSet from "$components/dashboard/ModeSet.svelte";
	import IndexSet from "$components/dashboard/IndexSet.svelte";
	import RadioSet from "$components/dashboard/RadioSet.svelte";
	import AxisX from "$components/charts/AxisX.svg.svelte";
	import AxisY from "$components/charts/AxisY.svg.svelte";
	import ScatterForce from "$components/dashboard/ScatterForce.svelte";
	import Tooltip from "$components/charts/Tooltip.html.svelte";
	import Deviation from "$components/charts/Deviation.svg.svelte";
	import HeatmapTable from "$components/dashboard/HeatmapTable.svelte";
	import WGSLogo from "$components/dashboard/WGSLogo.svg.svelte";
	import QuestionMark from "$components/dashboard/QuestionMark.svg.svelte";
	import Arrow from "$components/dashboard/Arrow.svg.svelte";
	import SizeLegend from "$components/dashboard/SizeLegend.svg.svelte";

	let selectedView = viewOptions[0].value;
	let selectedIndex = indexOptions[0].value;
	let selectedCountry = countryOptions[0].value;
	let selectedContinent = continentOptions[0].value;
	let selectedColor = colorOptions[0].value;
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

	let panelToggle = true;
	let handleToggle = () => {
		panelToggle = !panelToggle;
	};
</script>

<section>
	<div class="top-panel">
		<div class="top-panel-wrapper">
			<WGSLogo />
			<IndexSet options={indexOptions} bind:value={selectedIndex} />
			<QuestionMark />
		</div>
	</div>
	<div class="left-panel">
		<h5 class="panel-label">MODE</h5>
		<ModeSet options={viewOptions} bind:value={selectedView} />
	</div>
	<div
		class="arrow-icon"
		style="transform: translate(0, -50%) rotate({panelToggle ? -90 : 90}deg);"
		on:click={handleToggle}
		on:keydown={handleToggle}
	>
		<Arrow />
	</div>
	<div
		class="right-panel"
		style="transform: translate({panelToggle ? 0 : 150}%, -50%)"
	>
		<h5 class="panel-label" style="margin-top: 0">COUNTRY</h5>
		<Svelecte
			clearable={true}
			labelField="value"
			options={countryOptions}
			bind:value={selectedCountry}
		/>
		<h5 class="panel-label">COLOR</h5>
		<RadioSet options={colorOptions} bind:value={selectedColor} />
		<h5 class="panel-label">SIZE</h5>
		<RadioSet options={sizeOptions} bind:value={selectedSize} />
		{#if selectedSize === "Index"}
			<Svelecte
				labelField="value"
				options={indexOptions}
				bind:value={selectedSizeIndex}
			/>
		{/if}
		{#if selectedSize === "Feature"}
			<Svelecte
				clearable={true}
				groupLabelField="groupHeader"
				groupItemsField="items"
				labelField="value"
				options={sizeFeatureOptions}
				bind:value={selectedSizeFeature}
			/>
		{/if}
	</div>
	<div class="bottom-panel">
		<SizeLegend {data} width={120} height={40} />
	</div>
	<!--<div class="setting-panel">
		 <div class="setting-content">
			<h5 class="panel-label">Configure the Settings</h5>
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
	</div> -->

	<div class="chart">
		<figure>
			{#if selectedView === "Heatmap"}
				<HeatmapTable
					on:click={(event) => console.log("click", event.detail.props)}
					data={worldData}
					{selectedContinent}
					{selectedCountry}
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
							{selectedCountry}
						/>
					</Svg>
					<Html pointerEvents={false}>
						{#if hideTooltip !== true}
							<Tooltip {evt} let:detail>
								{#each Object.entries(detail.props) as [key, value]}
									{#if key === "Country"}
										<div class="row">{value}</div>
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
		width: 100vw;
		height: 100vh;
		background: rgb(16, 17, 39, 1);
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 1) 0%,
			rgba(20, 23, 84, 1) 100%
		);
	}
	:global(.svelecte-control, .sv-control) {
		--sv-bg: var(--color-yellow) !important;
		--sv-color: var(--color-gray-1000) !important;
		--sv-item-active-bg: var(--color-white) !important;
		--sv-border: 2px solid var(--color-purple-dark) !important;
		--sv-active-border: 2px solid var(--color-purple-dark) !important;
		border-radius: 4px !important;
		font-size: var(--12px);
		font-weight: 700;
		letter-spacing: 1px !important;
		--sv-min-height: 34px;
		height: 34px;
	}
	:global(.optgroup-header) {
		border: 2px dashed var(--color-purple-light);
		color: var(--color-purple-light) !important;
	}
	:global(.indicator-icon) {
		background-color: var(--color-purple-dark) !important;
		border: 1px solid var(--color-purple-light);
		color: var(--color-yellow);
		border-radius: 50%;
	}
	:global(.indicator-icon:hover) {
		opacity: 0.85;
		cursor: pointer;
	}
	:global(.indicator-separator) {
		background-color: var(--color-purple-dark) !important;
	}
	.panel-label {
		color: var(--color-yellow);
		font-weight: 700;
	}

	.top-panel {
		position: absolute;
		z-index: 8;
		width: 100%;
	}

	.top-panel-wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		width: auto;
		margin: var(--20px) var(--20px) 0 var(--20px);
	}

	.left-panel {
		position: absolute;
		z-index: 10;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		margin-left: var(--24px);
	}

	.right-panel {
		position: absolute;
		z-index: 10;
		top: 50%;
		right: 0;
		text-align: center;
		margin-right: var(--20px);
		width: 250px;
		padding: 1rem;
		border-radius: 4px;
		background: rgb(16, 17, 39);
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 0.65) 0%,
			rgba(27, 30, 128, 0.65) 100%
		);
		transition: all 0.5s cubic-bezier(0.47, 0, 0.05, 1);
	}
	.arrow-icon {
		position: absolute;
		z-index: 15;
		top: 50%;
		right: 30px;
		cursor: pointer;
	}
	.arrow-icon:hover {
		opacity: 0.9;
	}
	.bottom-panel {
		position: absolute;
		z-index: 10;
		bottom: 0;
		width: 100%;
	}

	.chart {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	figure {
		margin: 1rem auto;
		width: 75%;
		height: 70%;
		/* transform: translateX(-40px); */
	}
</style>
