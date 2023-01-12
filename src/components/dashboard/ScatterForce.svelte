<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { randomUniform, color } from "d3";
	import {
		forceSimulation,
		forceX,
		forceY,
		forceCollide,
		forceManyBody
	} from "d3-force";
	const { data, xGet, yGet, width } = getContext("LayerCake");
	const dispatch = createEventDispatcher();

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
		{@const r = d.size}
		<circle
			class="plot-stroke"
			id={id + "-stroke"}
			{cx}
			{cy}
			r={r + 10}
			fill={darker}
			opacity="0.2"
		/>
	{/each}
	{#each nodes as d}
		{@const cx = d.x}
		{@const cy = d.y}
		{@const id = d.Country}
		{@const fill = d.color}
		{@const brighter = color(d.color).brighter(0.2)}
		{@const r = d.size}
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
				clip-path="circle()"
				stroke={brighter}
				stroke-width={6}
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
		cursor: pointer;
	}
	circle {
		transition: all 0.7s ease-out;
	}
</style>
