<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { randomUniform, color } from "d3";
	import { isAll, getOpacity } from "$utils/dataProcessor";
	import {
		forceSimulation,
		forceX,
		forceY,
		forceCollide,
		forceManyBody
	} from "d3-force";
	const { data, xGet, yGet, width } = getContext("LayerCake");
	const dispatch = createEventDispatcher();

	export let selectedCountry;
	export let selectedContinent;
	export let xStrength = 0.5;
	export let yStrength = 0.5;
	const random = randomUniform(-800, 800);

	let nodes = [];
	const updatePositions = () => {
		nodes = $data.map((d) => ({
			...d,
			x: $xGet(d) + random(),
			targetX: $xGet(d),
			y: $yGet(d) + random(),
			targetY: $yGet(d)
		}));

		forceSimulation(nodes)
			.force("charge", forceManyBody().strength(5))
			.force(
				"x",
				forceX()
					.x((d) => $xGet(d))
					.strength(xStrength)
			)
			.force(
				"y",
				forceY()
					.y((d) => $yGet(d))
					.strength(yStrength)
			)
			.force(
				"collide",
				forceCollide((d) => d.size)
					.iterations(3)
					.strength(1.5)
			)
			.on("tick", (d) => {
				nodes = nodes;
			})
			// .velocityDecay(0.5)
			.restart();
	};

	$: $data, $width, updatePositions();
</script>

<g
	on:mouseout={(e) => dispatch("mouseout")}
	on:blur={(e) => dispatch("mouseout")}
>
	{#each nodes as d}
		{@const cx = d.x}
		{@const cy = d.y}
		{@const id = d.Country}
		{@const darker = color(d.color).darker(2)}
		{@const stroke = selectedCountry === d.Country ? "white" : "none"}
		{@const r = d.size ? d.size + 10 : 0}
		{@const isAllCountry = isAll(selectedCountry)}
		{@const isAllContinent = isAll(selectedContinent)}
		{@const opacity = getOpacity(
			d,
			isAllCountry,
			isAllContinent,
			selectedCountry,
			selectedContinent,
			0.05,
			0.2
		)}
		<span style="display: none;">{(darker.opacity = opacity)}</span>
		{#if d.isSize}
			<circle
				class="plot-stroke"
				id={id + "-stroke"}
				{cx}
				{cy}
				{r}
				fill={darker}
				{stroke}
				stroke-width="2"
			/>
		{/if}
	{/each}
	{#each nodes as d}
		{@const cx = d.x}
		{@const cy = d.y}
		{@const id = d.Country}
		{@const fill = d.color}
		{@const brighter =
			selectedCountry === d.Country ? "white" : color(d.color).brighter(0.2)}
		{@const strokeWidth = selectedCountry === d.Country ? 3 : 6}
		{@const r = d.size ? d.size : 0}
		{@const isAllCountry = isAll(selectedCountry)}
		{@const isAllContinent = isAll(selectedContinent)}
		{@const opacity = getOpacity(
			d,
			isAllCountry,
			isAllContinent,
			selectedCountry,
			selectedContinent,
			0.1,
			1
		)}
		{#if d.isSize}
			<circle
				class="plot"
				on:mouseover={(e) => dispatch("mousemove", { e, props: d })}
				on:focus={(e) => dispatch("mousemove", { e, props: d })}
				on:click={(e) => dispatch("click", { e, props: d })}
				on:keydown={(e) => dispatch("click", { e, props: d })}
				{id}
				{cx}
				{cy}
				{r}
				{fill}
				{opacity}
				clip-path="circle()"
				stroke={brighter}
				stroke-width={strokeWidth}
			/>
		{:else}
			<circle
				class="plot"
				on:mouseover={(e) => dispatch("mousemove", { e, props: d })}
				on:focus={(e) => dispatch("mousemove", { e, props: d })}
				on:click={(e) => dispatch("click", { e, props: d })}
				on:keydown={(e) => dispatch("click", { e, props: d })}
				{id}
				{cx}
				{cy}
				{r}
				{opacity}
				fill="transparent"
				clip-path="circle()"
				stroke={fill}
				stroke-width={5}
			/>
		{/if}
	{/each}
</g>

<style>
	.plot {
		cursor: url("/src/svg/cursor-pointer.svg") 12.5 12.5, auto;
	}
	circle {
		transition: all 0.7s ease-out;
	}
	g,
	circle:focus {
		outline: none;
	}
</style>
