<script>
	import { onMount } from "svelte";
	import { LayerCake, Svg, Html } from "layercake";
	import { mean, deviation } from "d3";
	import Shepherd from "/node_modules/shepherd.js/dist/js/shepherd.esm.js";
	import Svelecte from "/node_modules/svelecte/src/Svelecte.svelte";
	import {
		viewOptions,
		indexOptions,
		countryOptions,
		continentOptions,
		colorOptions,
		continentColors,
		classColors,
		indexColors,
		classOptions,
		sizeOptions,
		sizeFeatureOptions,
		filterContinentCountry,
		formatSNEData,
		formatBeeSwarmData,
		isFactor,
		numberFormatter,
		indexKeys
	} from "$utils/dataProcessor";

	import worldData from "$components/dashboard/world_data_imputed.csv";
	import ModeSet from "$components/dashboard/ModeSet.svelte";
	import IndexSet from "$components/dashboard/IndexSet.svelte";
	import RadioSet from "$components/dashboard/RadioSet.svelte";
	import AxisX from "$components/charts/AxisX.svg.svelte";
	import AxisY from "$components/charts/AxisY.svg.svelte";
	import ScatterForce from "$components/dashboard/ScatterForce.svelte";
	import Tooltip from "$components/charts/Tooltip.html.svelte";
	import Deviation from "$components/charts/Deviation.svg.svelte";
	import HeatmapTable from "$components/dashboard/HeatmapTable.svelte";
	import WGSLogo from "$components/dashboard/WGSLogo.svelte";
	import QuestionMark from "$components/dashboard/QuestionMark.svelte";
	import Arrow from "$components/dashboard/Arrow.svg.svelte";
	import SizeLegend from "$components/dashboard/SizeLegend.svg.svelte";
	import NullSizeLegend from "$components/dashboard/NullSizeLegend.svelte";
	import ColorLegend from "$components/dashboard/ColorLegend.svelte";
	import Modal from "$components/dashboard/Modal.svelte";
	import AxisRadar from "$components/charts/AxisRadar.svelte";
	import RadarChart from "$components/charts/RadarChart.svelte";

	export let isTutorial = true;
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
	$: if (selectedView === "Average") {
		let beeSwarmData = formatBeeSwarmData(
			selectedIndex,
			selectedColor,
			selectedSize,
			selectedSizeIndex,
			selectedSizeFeature,
			worldData
		);
		data = filterContinentCountry(
			selectedContinent,
			selectedCountry,
			beeSwarmData
		);
		[x, y] = ["BeeSwarmX", "BeeSwarmY"];
		[meanValue, stdValue] = [
			mean(data, (d) => d[y]),
			deviation(data, (d) => d[y])
		];
	}
	$: console.log("data", data);
	$: console.log("selectedColor", selectedColor);

	let panelToggle = false;
	onMount(() => (panelToggle = true));
	let handleToggle = () => {
		panelToggle = !panelToggle;
	};

	let showModal = false;
	let detail;
	let indexDetails = [];
	let handleOpenModal = (e) => {
		detail = e.detail.props;
		indexKeys.forEach((item) => {
			indexDetails = [...indexDetails, +detail[item]];
		});
		showModal = true;
		// console.log("detail", detail);
		// console.log("indexDetails", indexDetails);
	};
	let handleCloseModal = () => {
		showModal = false;
		indexDetails = [];
	};

	$: featureDropdownItemsSelect =
		typeof window !== "undefined"
			? document.getElementsByClassName("sv-item-content")
			: null;

	let featureDropdownItems;

	$: if (featureDropdownItems) {
		for (let i = 0; i < featureDropdownItems.length; i++) {
			featureDropdownItems[i].setAttribute(
				"title",
				featureDropdownItems[i].innerText
			);
		}
	}

	const tour = new Shepherd.Tour({
		useModalOverlay: true,
		defaultStepOptions: {
			classes: "tour-theme-custom",
			scrollTo: true,
			cancelIcon: {
				enabled: true
			},
			showOn: function () {
				const element = document.querySelector(this.attachTo.element);
				return Boolean(element);
			}
		}
	});

	onMount(() => {
		tour.addStep({
			id: "step-1-index",
			text: "The dashboard offers six different indexes that allow you to gain a more detailed understanding of a country's performance in each specific area.",
			attachTo: {
				element: ".top-panel-index",
				on: "bottom"
			},
			buttons: [
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-1-index-sustainability",
			text: "The sustainability index provides an overall score for each country based on the performance in all five key aspects (Human, Health, Environmental, Economical, and Political conditions).",
			attachTo: {
				element: ".Sustainability",
				on: "bottom"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-1-index-human",
			text: "The human index provides a score for each country based on performance of aspects like human rights, education, equality, and living standards.",
			attachTo: {
				element: ".Human",
				on: "bottom"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-1-index-health",
			text: "The health index provides a score for each country based on the performance of aspects like healthcare expenditure, accessibility, mortality rate, life expectancy, and prevalence of diseases.",
			attachTo: {
				element: ".Health",
				on: "bottom"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-1-index-environmental",
			text: "The environmental index provides a score for each country based on the performance of aspects like environmental quality, protection, and conservation e.g., CO2 emissions, electric power consumption, renewable energy consumption, and pollution.",
			attachTo: {
				element: ".Environment",
				on: "bottom"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-1-index-economic",
			text: "The economic index provides a score for each country based on the performance of aspects like economic stability, growth, and income equality.",
			attachTo: {
				element: ".Economics",
				on: "bottom"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-1-index-political",
			text: "The political index provides a score for each country based on the performance of aspects like political stability, control of corruption, government effectiveness, democracy, and political rights.",
			attachTo: {
				element: ".Politics",
				on: "bottom"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-2-mode",
			text: "Three different modes allow you to toggle between different views of the data. Switch between these modes by clicking the corresponding buttons on the mode panel, and explore the data in the way that best suits your needs.",
			attachTo: {
				element: ".left-panel",
				on: "right"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					text: "Next",
					action: tour.next
				}
			]
		});
		tour.addStep({
			id: "step-2-cluster",
			text: 'The first mode is the "Cluster" mode, which groups countries into clusters based on their level of the corresponding index. This mode allows you to identify which countries are similar (the closer together, the more similar)',
			attachTo: {
				element: ".option-cluster",
				on: "right"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					text: "Next",
					action: tour.next
				}
			]
		});
		tour.addStep({
			id: "step-2-average",
			text: 'The second mode is the "Average" mode, which allows you to see the performance of countries based on the index level and compare it to the global/continental average. The average score changes corresponding to the data you filter.',
			attachTo: {
				element: ".option-average",
				on: "right"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					text: "Next",
					action: tour.next
				}
			]
		});
		tour.addStep({
			id: "step-2-summary",
			text: `The third mode is the "Summary" mode, which provides a table view of countries sorted corresponding to the indexes' level (sustainability by default) and identify which countries are leading and vice versa.`,
			attachTo: {
				element: ".option-heatmap",
				on: "right"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					text: "Next",
					action: tour.next
				}
			]
		});
		tour.addStep({
			id: "step-3-focus",
			text: "The focus functionality allows you to focus on a specific continent and/or country. Select the continent and/or country from the drop-down menu or search by typing the name into the box.",
			attachTo: {
				element: ".right-panel-focus",
				on: "left"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-4-color",
			text: "Customize the color of each data point to represent different aspects. This feature allows you to quickly identify patterns and trends in the data that best suits your needs.",
			attachTo: {
				element: ".right-panel-color",
				on: "left"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-5-size",
			text: "You can also customize the size of each data point to represent different aspects.",
			attachTo: {
				element: ".right-panel-size",
				on: "left"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-6-size-legend",
			text: "This is the legend for the shape and size of the data points.",
			attachTo: {
				element: ".size-legend",
				on: "right"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-7-color-legend",
			text: "This is the legend for the color of the data points.",
			attachTo: {
				element: ".bottom-panel",
				on: "top"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-8-chart",
			text: "Explore the data! Click on a data point to see detailed information about that country's performance in each of the six indexes (Sustainability, Human, Health, Environment, Economics, and Politics), and see the raw data of the factors that contribute to the indexes.",
			attachTo: {
				element: ".inner-chart",
				on: "bottom"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.next();
					},
					text: "Next"
				}
			]
		});
		tour.addStep({
			id: "step-9-info",
			text: "Need a refresher? Click here to see a step-by-step guide on how to use the dashboard and explore the data again.",
			attachTo: {
				element: ".info",
				on: "bottom"
			},
			buttons: [
				{
					action() {
						return this.back();
					},
					text: "Back"
				},
				{
					action() {
						return this.complete();
					},
					text: "Done"
				}
			]
		});
		isTutorial ? tour.start() : null;
	});

	let isInfoOpen = false;
	const handleTourStart = () => {
		tour.start();
		isInfoOpen = false;
	};
</script>

<section>
	<div class="top-panel">
		<div class="top-panel-wrapper">
			<WGSLogo />
			<div style="z-index: {selectedView !== 'Heatmap' ? 8 : 0};">
				{#if selectedView !== "Heatmap"}
					<div class="top-panel-index">
						<IndexSet options={indexOptions} bind:value={selectedIndex} />
					</div>
				{:else}
					<IndexSet
						disabled
						options={indexOptions}
						bind:value={selectedIndex}
					/>
				{/if}
			</div>
			<QuestionMark bind:open={isInfoOpen}>
				<div class="buttons" slot="tour">
					<button class="tour-button" on:click={handleTourStart}>Guide</button>
					<button class="tour-button" on:click={handleTourStart}
						>Insights</button
					>
				</div>
			</QuestionMark>
		</div>
	</div>
	<div class="left-panel">
		<h5 class="panel-label">MODE</h5>
		<ModeSet options={viewOptions} bind:value={selectedView} />
	</div>
	<div
		class="arrow-icon"
		style="transform: translate(0, {selectedView !== 'Heatmap'
			? -50
			: -170}%) rotate({panelToggle ? -90 : 90}deg);"
		on:click={handleToggle}
		on:keydown={handleToggle}
	>
		<Arrow />
	</div>
	<div
		class="right-panel"
		style="transform: translate({panelToggle ? 0 : 150}%, -50%)"
	>
		<div class="right-panel-focus">
			<h5 class="panel-label" style="margin-top: 0">FOCUS</h5>
			<Svelecte
				labelField="value"
				options={continentOptions}
				bind:value={selectedContinent}
			/>
			<Svelecte
				clearable={true}
				labelField="value"
				options={countryOptions}
				bind:value={selectedCountry}
			/>
		</div>
		{#if selectedView !== "Heatmap"}
			<div class="right-panel-color">
				<h5 class="panel-label">COLOR</h5>
				<RadioSet options={colorOptions} bind:value={selectedColor} />
			</div>
			<div class="right-panel-size">
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
					<div
						on:click={() => (featureDropdownItems = featureDropdownItemsSelect)}
						on:keydown={() =>
							(featureDropdownItems = featureDropdownItemsSelect)}
					>
						<Svelecte
							clearable={true}
							groupLabelField="groupHeader"
							groupItemsField="items"
							labelField="value"
							options={sizeFeatureOptions}
							bind:value={selectedSizeFeature}
						/>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div class="size-legend">
		<NullSizeLegend />
		{#if selectedView !== "Heatmap"}
			<SizeLegend {data} width={120} height={40} />
		{:else}
			{@const indexSize = [{ sizeDomain: [0.0, 0.8] }]}
			<SizeLegend data={indexSize} width={120} height={40} />
		{/if}
	</div>
	<div class="bottom-panel">
		<div class="color-bar">
			{#if selectedView !== "Heatmap"}
				{#if selectedColor === "Continent"}
					<ColorLegend color={continentColors} options={continentOptions} />
				{:else if selectedColor === "Class"}
					<ColorLegend color={classColors} options={classOptions} />
				{:else}
					<ColorLegend color={indexColors} options={[selectedColor]} />
				{/if}
			{:else}
				<ColorLegend color={indexColors} options={indexOptions} isIndex />
			{/if}
		</div>
	</div>
	{#if showModal}
		<Modal on:close={handleCloseModal}>
			<h5
				class="panel-label"
				slot="header"
				style="padding-left: 10px; margin-bottom: 0px;"
			>
				{detail.Country.toUpperCase()}
			</h5>
			<div class="sub-label" slot="sub-header">
				<div>
					<p>Country code: {detail["ISO Country code"]}</p>
					<p>Continent: {detail.Continent}</p>
					<div class="index-label">
						<table>
							{#each indexOptions as { value }}
								<tr>
									<td style="width:70%; padding-left: 0px;">{value}</td>
									<td>{(+detail[value + "Index"]).toFixed(2)}</td>
								</tr>
							{/each}
						</table>
					</div>
				</div>
				<div class="radar-chart">
					<svg width={250} height={250}>
						<AxisRadar width={250} height={250} options={indexOptions} />
						<RadarChart width={250} height={250} data={indexDetails} />
					</svg>
				</div>
			</div>
			<div class="table-container">
				<table>
					{#each Object.entries(detail) as [key, value]}
						{#if isFactor(key)}
							<tr class="detail-table">
								<td style="width:70%">{key}</td>
								<td>{+value === 0 ? "" : numberFormatter(+value)}</td>
							</tr>
						{/if}
					{/each}
					<table />
				</table>
			</div>
		</Modal>
	{/if}

	<div class="chart">
		<figure
			class="inner-chart"
			style="transform: translateX({panelToggle ? 0 : 5}%);"
		>
			{#if selectedView === "Heatmap"}
				<HeatmapTable
					on:click={handleOpenModal}
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
							on:click={handleOpenModal}
							{selectedCountry}
							{selectedContinent}
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
		position: absolute;
		overflow: hidden;
		width: 100vw;
		height: 100vh;
		background: rgba(16, 17, 39, 1);
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 1) 0%,
			rgba(22, 27, 118, 1) 100%
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
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
	}
	:global(.sv-item, .sv-item-content) {
		color: var(--color-purple-dark) !important;
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto !important;
	}
	:global(.optgroup-header) {
		border: 2px dashed var(--color-purple-light);
		color: var(--color-purple-light) !important;
	}
	:global(.indicator-icon) {
		background: linear-gradient(
			0deg,
			rgba(20, 20, 49, 1) 0%,
			rgb(4, 20, 255) 100%
		) !important;
		border: 1px solid var(--color-purple-light);
		color: var(--color-yellow);
		border-radius: 50%;
	}
	:global(.indicator-icon:hover) {
		opacity: 0.85;
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
	}
	:global(.indicator-separator) {
		background-color: var(--color-purple-dark) !important;
	}
	.panel-label {
		color: var(--color-yellow);
		font-weight: 700;
	}
	.sub-label {
		display: flex;
		padding-left: 10px;
		justify-content: space-between;
		color: var(--color-yellow);
		font-size: var(--12px);
		line-height: 0.5rem;
		animation: fadeInModal 1s cubic-bezier(0.47, 0, 0.05, 1);
	}

	.top-panel {
		position: absolute;
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
		top: 40%;
		transform: translateY(-40%);
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
			rgba(27, 34, 175, 0.65) 100%
		);
		transition: all 0.5s cubic-bezier(0.47, 0, 0.05, 1);
	}
	.arrow-icon {
		position: absolute;
		z-index: 15;
		top: 50%;
		right: 30px;
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
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
	.color-bar {
		display: flex;
		width: 100%;
		margin: auto;
	}
	.size-legend {
		position: absolute;
		bottom: 60px;
		margin-left: var(--24px);
	}

	.chart {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.inner-chart {
		z-index: 9;
	}
	figure {
		margin: 1rem auto;
		width: 75%;
		height: 70%;
		transition: all 1s cubic-bezier(0.47, 0, 0.05, 1);
		/* transform: translateX(-40px); */
	}

	.table-container {
		width: 100%;
		height: 200px;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
	}
	table,
	td {
		font-size: var(--12px);
		color: var(--color-white);
		letter-spacing: 2px;
		scroll-snap-align: start;
	}
	td {
		padding: 10px;
	}
	.detail-table {
		animation: fadeInModal 2s cubic-bezier(0.47, 0, 0.05, 1);
	}
	.detail-table:nth-child(odd) {
		background-color: rgb(179, 122, 250, 0.13);
	}
	.radar-chart {
		transform: translateY(-5px);
	}

	.buttons {
		display: flex;
		justify-content: center;
		gap: var(--14px);
	}
	.tour-button {
		font-family: "Orbitron", sans-serif;
		padding: 8px 20px;
		font-size: var(--13px);
		letter-spacing: 1px;
		color: var(--color-yellow);
		width: 140px;
		margin-top: 16px;
		border: 2px solid var(--color-yellow);
		border-radius: 20px;
		background: var(--color-purple-dark);
		background: linear-gradient(
			0deg,
			rgba(16, 17, 39, 1) 0%,
			rgba(27, 34, 175, 1) 100%
		);
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
	}
	.tour-button:hover {
		background: rgba(20, 23, 84, 1);
	}

	@keyframes fadeInModal {
		0% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}
</style>
