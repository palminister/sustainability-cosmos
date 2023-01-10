<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { randomUniform } from "d3";
	import {
		forceSimulation,
		forceX,
		forceY,
		forceCollide,
		forceManyBody
	} from "d3-force";
	const { data, xGet, yGet, width } = getContext("LayerCake");
	const dispatch = createEventDispatcher();

	export let r = 6;
	export let fill = "#ccc";
	export let stroke = "#000";
	export let strokeWidth = 0;

	export let xStrength = 0.5;
	export let yStrength = 0.5;
	const random = randomUniform(-800, 800);
	// const randomRadius = randomUniform(6, 15);
	// const random = 0;

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
				forceCollide((d) => r)
					.iterations(3)
					.strength(1)
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
		<circle
			on:mouseover={(e) => dispatch("mousemove", { e, props: d })}
			on:focus={(e) => dispatch("mousemove", { e, props: d })}
			on:click={(e) => dispatch("click", { e, props: d })}
			on:keydown={(e) => dispatch("click", { e, props: d })}
			{id}
			{cx}
			{cy}
			{r}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
	{/each}
</g>

<style>
	circle {
		cursor: pointer;
		transition: all 0.7s ease-out;
	}
</style>
